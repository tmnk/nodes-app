var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'taskApp'
});

connection.connect();
var id = 1;
connection.query(`Call Stats (1)`, function (error, results, fields) {
  if (error) throw error;
  console.log(results[0][0]["(SELECT count(id) from task, taskUser where NameId = taskUser.userID and taskUser.taskID = task.id and task.status = 1) / (SELECT count(id) from task, taskUser where NameId = taskUser.userID and taskUser.taskID = task.id)"])
});
connection.end();