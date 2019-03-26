const pg = require("pg");
const settings = require("./settings"); // settings.json
const funcLookup = require("./lookup_people")

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const arg = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  funcLookup.lookupPeople(client, arg);
});

