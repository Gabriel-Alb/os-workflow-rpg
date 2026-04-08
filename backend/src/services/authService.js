const { pool } = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

async function login(login, senha) {
  const { rows } = await pool.query(
    'SELECT id, nome, login, senha, ativo FROM usuarios WHERE login = $1 LIMIT 1',
    [login]
  );

  const usuario = rows[0];

  if (!usuario || !usuario.ativo) {
    throw AppError.unauthorized('Credenciais inválidas');
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) {
    throw AppError.unauthorized('Credenciais inválidas');
  }

  const token = jwt.sign(
    { sub: usuario.id, nome: usuario.nome, login: usuario.login },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
  );

  return {
    token,
    usuario: { id: usuario.id, nome: usuario.nome, login: usuario.login },
  };
}

async function me(usuarioId) {
  const { rows } = await pool.query(
    'SELECT id, nome, login, ativo, data_criacao FROM usuarios WHERE id = $1 LIMIT 1',
    [usuarioId]
  );
  if (!rows[0]) throw AppError.notFound('Usuário não encontrado');
  return rows[0];
}

module.exports = { login, me };
