require('dotenv/config');

module.exports = {
  dialect: 'postgres', // é necessário adicionar 'yarn add pg pg-hstore'
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true, // colunas created_at, updated_at
    underscored: true, // padronização de tabelas ex: user_groups
    underscoredAll: true, // padronização de colunas e relacionamentos ex: user_groups
  },
};
