const { NODE_PORT, NODE_DB_URL } = process.env

module.exports = {
  PORT: NODE_PORT,
  DB_URL: NODE_DB_URL
}
