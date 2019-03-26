const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host     : '127.0.0.1',
    user     : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const args = process.argv.slice(2);

knex('famous_people')
  .insert({ first_name: args[0], last_name: args[1], birthdate: args[2] })
  .then(() =>
    knex.from('famous_people')
      .select('*')
      .then((rows) => {
        (console.log(rows));
      }
      ))
  .catch((err) => { console.log(err); throw err })
  .finally(() => {
    knex.destroy();
    process.exit();
  });