module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "movies1234",
  DB: "db_movies",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}