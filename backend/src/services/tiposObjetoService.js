const { pool } = require('../config/database');
const AppError = require('../utils/AppError');

async function listar() {
  const { rows } = await pool.query(
    'SELECT id, nome, descricao, data_criacao FROM tipos_objeto ORDER BY nome'
  );
  return rows;
}

async function buscarPorId(id) {
  const { rows } = await pool.query(
    'SELECT id, nome, descricao, data_criacao FROM tipos_objeto WHERE id = $1',
    [id]
  );
  if (!rows[0]) throw AppError.notFound('Tipo de objeto não encontrado');
  return rows[0];
}

async function criar({ nome, descricao }) {
  const { rows } = await pool.query(
    `INSERT INTO tipos_objeto (nome, descricao) VALUES ($1, $2) RETURNING *`,
    [nome, descricao || null]
  );
  return rows[0];
}

async function atualizar(id, { nome, descricao }) {
  await buscarPorId(id);
  const { rows } = await pool.query(
    `UPDATE tipos_objeto
     SET nome = COALESCE($1, nome),
         descricao = $2
     WHERE id = $3
     RETURNING *`,
    [nome, descricao ?? null, id]
  );
  return rows[0];
}

async function deletar(id) {
  await buscarPorId(id);

  const { rows } = await pool.query(
    'SELECT id FROM itens_ordem_servico WHERE tipo_objeto_id = $1 LIMIT 1',
    [id]
  );
  if (rows.length > 0) {
    throw AppError.conflict('Tipo de objeto está vinculado a itens e não pode ser excluído');
  }

  await pool.query('DELETE FROM tipos_objeto WHERE id = $1', [id]);
}

module.exports = { listar, buscarPorId, criar, atualizar, deletar };
