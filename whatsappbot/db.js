const { Client } = require("pg");

const pgclient = new Client({
  host: "UNIPET_DB",
  port: 5432,
  user: "postgres",
  database: process.env.UNIPET_DB_NAME,
  password: process.env.UNIPET_DB_PASSWORD
});
pgclient.connect();
pgclient.query("LISTEN whatsapp");
module.exports = { pgclient };
