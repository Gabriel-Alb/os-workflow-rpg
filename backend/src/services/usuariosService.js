const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');
const AppError = require('../utils/AppError');

const SALT_ROUNDS = 12;

async function listar() {
  const { rows } = await pool.query(
    'SELECT id, nome, login, ativo, data_criacao FROM usuarios ORDER BY nome'
  );
  return rows;
}

async function buscarPorId(id) {
  const { rows } = await pool.query(
    'SELECT id, nome, login, ativo, data_criacao FROM usuarios WHERE id = $1',
    [id]
  );
  if (!rows[0]) throw AppError.notFound('Usuário não encontrado');
  return rows[0];
}

async function criar({ nome, login, senha, ativo = true }) {
  const hash = await bcrypt.hash(senha, SALT_ROUNDS);
  const { rows } = await pool.query(
    `INSERT INTO usuarios (nome, login, senha, ativo)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nome, login, ativo, data_criacao`,
    [nome, login, hash, ativo]
  );
  return rows[0];
}

async function atualizar(id, { nome, login, ativo }) {
  await buscarPorId(id);

  const { rows } = await pool.query(
    `UPDATE usuarios
     SET nome = COALESCE($1, nome),
         login = COALESCE($2, login),
         ativo = COALESCE($3, ativo),
         data_atualizacao = CURRENT_TIMESTAMP
     WHERE id = $4
     RETURNING id, nome, login, ativo, data_criacao`,
    [nome, login, ativo, id]
  );
  return rows[0];
}

async function trocarSenha(id, senhaAtual, novaSenha) {
  const { rows } = await pool.query(
    'SELECT senha FROM usuarios WHERE id = $1',
    [id]
  );
  if (!rows[0]) throw AppError.notFound('Usuário não encontrado');

  const valida = await bcrypt.compare(senhaAtual, rows[0].senha);
  if (!valida) throw AppError.badRequest('Senha atual incorreta');

  const hash = await bcrypt.hash(novaSenha, SALT_ROUNDS);
  await pool.query(
    'UPDATE usuarios SET senha = $1, data_atualizacao = CURRENT_TIMESTAMP WHERE id = $2',
    [hash, id]
  );
}

module.exports = { listar, buscarPorId, criar, atualizar, trocarSenha };
