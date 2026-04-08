const { pool } = require('../config/database');
const AppError = require('../utils/AppError');

async function listar({ q, page = 1, limit = 20 } = {}) {
  const offset = (page - 1) * limit;
  const params = [];
  let where = '';

  if (q) {
    params.push(`%${q}%`);
    where = `WHERE nome ILIKE $1 OR telefone ILIKE $1 OR cpf ILIKE $1`;
  }

  const countQuery = `SELECT COUNT(*) FROM clientes ${where}`;
  const dataQuery = `
    SELECT id, nome, telefone, cpf, email, informacao_adicional, data_criacao
    FROM clientes ${where}
    ORDER BY nome
    LIMIT ${limit} OFFSET ${offset}
  `;

  const [countRes, dataRes] = await Promise.all([
    pool.query(countQuery, params),
    pool.query(dataQuery, params),
  ]);

  return {
    data: dataRes.rows,
    total: Number(countRes.rows[0].count),
    page: Number(page),
    limit: Number(limit),
  };
}

async function buscarPorId(id) {
  const { rows } = await pool.query(
    'SELECT id, nome, telefone, cpf, email, informacao_adicional, data_criacao FROM clientes WHERE id = $1',
    [id]
  );
  if (!rows[0]) throw AppError.notFound('Cliente não encontrado');
  return rows[0];
}

async function criar({ nome, telefone, cpf, email, informacao_adicional }) {
  const { rows } = await pool.query(
    `INSERT INTO clientes (nome, telefone, cpf, email, informacao_adicional)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [nome, telefone, cpf || null, email || null, informacao_adicional || null]
  );
  return rows[0];
}

async function atualizar(id, { nome, telefone, cpf, email, informacao_adicional }) {
  await buscarPorId(id);

  const { rows } = await pool.query(
    `UPDATE clientes
     SET nome = COALESCE($1, nome),
         telefone = COALESCE($2, telefone),
         cpf = $3,
         email = $4,
         informacao_adicional = $5
     WHERE id = $6
     RETURNING *`,
    [nome, telefone, cpf ?? null, email ?? null, informacao_adicional ?? null, id]
  );
  return rows[0];
}

async function deletar(id) {
  await buscarPorId(id);

  // Verifica se tem OS vinculada antes de deletar
  const { rows } = await pool.query(
    'SELECT id FROM ordens_servico WHERE cliente_id = $1 LIMIT 1',
    [id]
  );
  if (rows.length > 0) {
    throw AppError.conflict('Não é possível excluir cliente com ordens de serviço cadastradas');
  }

  await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
