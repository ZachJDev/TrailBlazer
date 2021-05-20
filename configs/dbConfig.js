module.exports = {
  user: process.env.MYSQL_USER,
  host: "localhost",
  dbname: 'TrailBlazer_Dev',
  pw: process.env.MYSQL_PASSWORD,
  port: "3306",
  URL_REMOTE: process.env.CLEARDB_DATABASE_URL,
};
