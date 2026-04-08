const { pool } = require('../config/database');
const AppError = require('../utils/AppError');

async function listar({ ativo } = {}) {
  const params = [];
  let where = '';

  if (ativo !== undefined) {
    params.push(ativo === 'true' || ativo === true);
    where = 'WHERE ativo = $1';
  }

  const { rows } = await pool.query(
    `SELECT id, nome, valor, descricao, ativo, data_criacao FROM servicos ${where} ORDER BY nome`,
    params
  );
  return rows;
}

async function buscarPorId(id) {
  const { rows } = await pool.query(
    'SELECT id, nome, valor, descricao, ativo, data_criacao FROM servicos WHERE id = $1',
    [id]
  );
  if (!rows[0]) throw AppError.notFound('Serviço não encontrado');
  return rows[0];
}

async function criar({ nome, valor, descricao, ativo = true }) {
  const { rows } = await pool.query(
    `INSERT INTO servicos (nome, valor, descricao, ativo) VALUES ($1, $2, $3, $4) RETURNING *`,
    [nome, valor, descricao || null, ativo]
  );
  return rows[0];
}

async function atualizar(id, { nome, valor, descricao, ativo }) {
  await buscarPorId(id);
  const { rows } = await pool.query(
    `UPDATE servicos
     SET nome = COALESCE($1, nome),
         valor = COALESCE($2, valor),
         descricao = $3,
         ativo = COALESCE($4, ativo)
     WHERE id = $5
     RETURNING *`,
    [nome, valor, descricao ?? null, ativo, id]
  );
  return rows[0];
}

async function deletar(id) {
  await buscarPorId(id);

  const { rows } = await pool.query(
    'SELECT id FROM itens_ordem_servico WHERE servico_id = $1 LIMIT 1',
    [id]
  );
  if (rows.length > 0) {
    // Soft delete: desativa ao invés de excluir
    const { rows: updated } = await pool.query(
      'UPDATE servicos SET ativo = FALSE WHERE id = $1 RETURNING *',
      [id]
    );
    return { ...updated[0], _softDeleted: true };
  }

  await pool.query('DELETE FROM servicos WHERE id = $1', [id]);
  return null;
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
