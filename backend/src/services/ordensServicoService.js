const { pool } = require('../config/database');
const AppError = require('../utils/AppError');

const ESTADOS_VALIDOS = ['ENTRADA', 'ORCAMENTO', 'EM_ANDAMENTO', 'CANCELADO', 'CONCLUIDO'];

// ──────────────────────────────────────
// Listagem com filtros e paginação
// ──────────────────────────────────────
async function listar({ estado, clienteId, usuarioId, dataInicio, dataFim, page = 1, limit = 20 } = {}) {
  const params = [];
  const conditions = [];
  let i = 1;

  if (estado) {
    conditions.push(`os.estado = $${i++}`);
    params.push(estado.toUpperCase());
  }
  if (clienteId) {
    conditions.push(`os.cliente_id = $${i++}`);
    params.push(clienteId);
  }
  if (usuarioId) {
    conditions.push(`os.usuario_id = $${i++}`);
    params.push(usuarioId);
  }
  if (dataInicio) {
    conditions.push(`os.data_entrega >= $${i++}`);
    params.push(dataInicio);
  }
  if (dataFim) {
    conditions.push(`os.data_entrega <= $${i++}`);
    params.push(dataFim);
  }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const offset = (page - 1) * limit;

  const sql = `
    SELECT
      os.id,
      os.numero,
      os.estado,
      os.data_criacao,
      os.data_entrega,
      os.hora_entrega,
      os.valor_total,
      os.valor_orcamento,
      os.observacoes,
      c.id   AS cliente_id,
      c.nome AS cliente_nome,
      c.telefone AS cliente_telefone,
      u.id   AS usuario_id,
      u.nome AS usuario_nome
    FROM ordens_servico os
    JOIN clientes  c ON c.id = os.cliente_id
    JOIN usuarios  u ON u.id = os.usuario_id
    ${where}
    ORDER BY os.data_criacao DESC
    LIMIT ${limit} OFFSET ${offset}
  `;

  const countSql = `SELECT COUNT(*) FROM ordens_servico os ${where}`;

  const [countRes, dataRes] = await Promise.all([
    pool.query(countSql, params),
    pool.query(sql, params),
  ]);

  return {
    data: dataRes.rows,
    total: Number(countRes.rows[0].count),
    page: Number(page),
    limit: Number(limit),
  };
}

// ──────────────────────────────────────
// Busca completa (com itens)
// ──────────────────────────────────────
async function buscarPorId(id) {
  const osRes = await pool.query(
    `SELECT
       os.*,
       c.nome AS cliente_nome, c.telefone AS cliente_telefone, c.cpf AS cliente_cpf,
       u.nome AS usuario_nome
     FROM ordens_servico os
     JOIN clientes c ON c.id = os.cliente_id
     JOIN usuarios u ON u.id = os.usuario_id
     WHERE os.id = $1`,
    [id]
  );

  if (!osRes.rows[0]) throw AppError.notFound('Ordem de serviço não encontrada');

  const itensRes = await pool.query(
    `SELECT
       i.*,
       s.nome AS servico_nome, s.valor AS servico_valor_padrao,
       t.nome AS tipo_objeto_nome
     FROM itens_ordem_servico i
     JOIN servicos     s ON s.id = i.servico_id
     JOIN tipos_objeto t ON t.id = i.tipo_objeto_id
     WHERE i.ordem_id = $1
     ORDER BY i.id`,
    [id]
  );

  return { ...osRes.rows[0], itens: itensRes.rows };
}

// ──────────────────────────────────────
// Criar OS com itens (transação)
// ──────────────────────────────────────
async function criar({ cliente_id, usuario_id, data_entrega, hora_entrega, observacoes, itens = [] }) {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const osRes = await client.query(
      `INSERT INTO ordens_servico (cliente_id, usuario_id, data_entrega, hora_entrega, observacoes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [cliente_id, usuario_id, data_entrega, hora_entrega || null, observacoes || null]
    );

    const os = osRes.rows[0];

    for (const item of itens) {
      await client.query(
        `INSERT INTO itens_ordem_servico
           (ordem_id, tipo_objeto_id, servico_id, quantidade, valor_unitario, eh_orcamento, observacoes, foto_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          os.id,
          item.tipo_objeto_id,
          item.servico_id,
          item.quantidade || 1,
          item.valor_unitario || 0,
          item.eh_orcamento || false,
          item.observacoes || null,
          item.foto_url || null,
        ]
      );
    }

    await client.query('COMMIT');

    return buscarPorId(os.id);
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

// ──────────────────────────────────────
// Atualizar dados da OS (sem itens)
// ──────────────────────────────────────
async function atualizar(id, { data_entrega, hora_entrega, observacoes }) {
  await buscarPorId(id);

  await pool.query(
    `UPDATE ordens_servico
     SET data_entrega = COALESCE($1, data_entrega),
         hora_entrega = $2,
         observacoes  = $3,
         data_atualizacao = CURRENT_TIMESTAMP
     WHERE id = $4`,
    [data_entrega, hora_entrega ?? null, observacoes ?? null, id]
  );

  return buscarPorId(id);
}

// ──────────────────────────────────────
// Transição de estado
// ──────────────────────────────────────
async function mudarEstado(id, novoEstado) {
  const estadoUpper = novoEstado?.toUpperCase();
  if (!ESTADOS_VALIDOS.includes(estadoUpper)) {
    throw AppError.badRequest(`Estado inválido. Valores aceitos: ${ESTADOS_VALIDOS.join(', ')}`);
  }

  const { rows } = await pool.query(
    `UPDATE ordens_servico
     SET estado = $1, data_atualizacao = CURRENT_TIMESTAMP
     WHERE id = $2
     RETURNING id, numero, estado`,
    [estadoUpper, id]
  );

  if (!rows[0]) throw AppError.notFound('Ordem de serviço não encontrada');
  return rows[0];
}

// ──────────────────────────────────────
// Itens
// ──────────────────────────────────────
async function adicionarItem(ordemId, { tipo_objeto_id, servico_id, quantidade, valor_unitario, eh_orcamento, observacoes, foto_url }) {
  // Confirma que a OS existe
  const { rows: osRows } = await pool.query('SELECT id FROM ordens_servico WHERE id = $1', [ordemId]);
  if (!osRows[0]) throw AppError.notFound('Ordem de serviço não encontrada');

  const { rows } = await pool.query(
    `INSERT INTO itens_ordem_servico
       (ordem_id, tipo_objeto_id, servico_id, quantidade, valor_unitario, eh_orcamento, observacoes, foto_url)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [ordemId, tipo_objeto_id, servico_id, quantidade || 1, valor_unitario || 0, eh_orcamento || false, observacoes || null, foto_url || null]
  );
  return rows[0];
}

async function atualizarItem(ordemId, itemId, { quantidade, valor_unitario, eh_orcamento, estado, observacoes, foto_url, data_entrega, hora_entrega }) {
  const { rows } = await pool.query(
    'SELECT id FROM itens_ordem_servico WHERE id = $1 AND ordem_id = $2',
    [itemId, ordemId]
  );
  if (!rows[0]) throw AppError.notFound('Item não encontrado nesta ordem');

  const { rows: updated } = await pool.query(
    `UPDATE itens_ordem_servico
     SET quantidade     = COALESCE($1, quantidade),
         valor_unitario = COALESCE($2, valor_unitario),
         eh_orcamento   = COALESCE($3, eh_orcamento),
         estado         = COALESCE($4, estado),
         observacoes    = $5,
         foto_url       = $6,
         data_entrega   = $7,
         hora_entrega   = $8
     WHERE id = $9
     RETURNING *`,
    [quantidade, valor_unitario, eh_orcamento, estado ? estado.toUpperCase() : null,
      observacoes ?? null, foto_url ?? null, data_entrega ?? null, hora_entrega ?? null, itemId]
  );
  return updated[0];
}

async function removerItem(ordemId, itemId) {
  const { rows } = await pool.query(
    'DELETE FROM itens_ordem_servico WHERE id = $1 AND ordem_id = $2 RETURNING id',
    [itemId, ordemId]
  );
  if (!rows[0]) throw AppError.notFound('Item não encontrado nesta ordem');
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  mudarEstado,
  adicionarItem,
  atualizarItem,
  removerItem,
};
