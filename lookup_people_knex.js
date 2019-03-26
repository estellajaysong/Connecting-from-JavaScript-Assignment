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

const arg = process.argv[2];

knex.from('famous_people').select('first_name', 'last_name', 'birthdate').where('first_name', '=', arg).orWhere('last_name', '=', arg)
  .then(console.log('Searching ...'))
  .then((rows) => {
    (console.log(`Found ${rows.length} person(s) by the name '${arg}':`))
    let i = 1;
    for (row of rows) {
      console.log(`- ${i}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().split('T').slice(0, 1)}'`);
      i += 1;
    }
  }).catch((err) => { console.log(err); throw err })
  .finally(() => {
    knex.destroy();
  });