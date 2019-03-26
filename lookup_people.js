const pg = require("pg");
const settings = require("./settings"); // settings.json

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
  client.query("SELECT id, first_name, last_name, birthdate FROM famous_people WHERE first_name = $1 OR last_name = $1", [arg], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('Searching ...');
    console.log(`Found ${result.rows.length} person(s) by the name '${arg}':`);
    let i = 1;
    result.rows.forEach((row) => {
    console.log(`- ${i}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().split('T').slice(0, 1)}'`);
    i += 1;
    });
    client.end();
  });
});
