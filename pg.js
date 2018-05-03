var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'taskApp'
});

connection.connect();
var id = 1;
connection.query(`SELECT one, two, whom, body, date from friends, chat where friends.id = chat.friendsID and ((one != ${id} and two = ${id}) or (one = ${id} and two != ${id}))`, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});
connection.end();