const express = require('express');
const app = express();
var qs = require('querystring');
const articles = [{ title: 'Example' }];
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'taskApp'
});

connection.connect();
function randomInteger(min = 1000, max = 9900000) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
  }

app.set('port', process.env.PORT || 3000);

app.post('/addMess', (req, res, next) => {
	var gg = {
	};
	var url = require("url");
	var tmp = {}
	req.url.split("?")[1].split('&').forEach(ar => tmp[ar.split('=')[0]] = ar.split('=')[1]);
	console.log(tmp)
	connection.query(`INSERT INTO chat(friendsID, body, date, whom) VALUES ((select id from friends where one = ${tmp.one} and two = ${tmp.two}),${tmp.body},NOW(),0)`, function (error, results, fields) {
		  if (error) throw error;
		});
	console.log("mess send")
	res.setHeader("access-control-allow-origin", "*")
	res.send(JSON.stringify({"update" : 1}));
});
app.post('/upTask', (req, res, next) => {
	var gg = {
	};
	var url = require("url");
	var tmp = {}
	req.url.split("?")[1].split('&').forEach(ar => tmp[ar.split('=')[0]] = ar.split('=')[1]);
	console.log(tmp)
	connection.query(`UPDATE task SET status=${tmp.status},pbl=${tmp.pbl} WHERE id = ${tmp.id}`, function (error, results, fields) {
		  if (error) throw error;
		});
	console.log("update create")
	res.setHeader("access-control-allow-origin", "*")
	res.send(JSON.stringify({"update" : 1}));
});
app.post('/newTask', (req, res, next) => {
	var gg = {
	};
	var url = require("url");
	var tmp = {}
	req.url.split("?")[1].split('&').forEach(ar => tmp[ar.split('=')[0]] = ar.split('=')[1]);
	let randId = randomInteger();
	connection.query(`INSERT INTO taskUser(userID, taskID) VALUES (${parseInt(tmp.id)},${randId});`, function (error, results, fields) {
		  if (error) throw error;
		});
		  console.log(`INSERT INTO task(id, body, status, date, pbl) VALUES (${randId},${tmp.body},0,NOW(),0)`)
		  connection.query(`INSERT INTO task(id, body, status, date, pbl) VALUES (${randId},"${tmp.body}",0,NOW(),0)`, function (error, results, fields) {
		  	if (error) throw error;
		  	console.log("add task")
		  })
	console.log(tmp)
	res.setHeader("access-control-allow-origin", "*")
	res.send(JSON.stringify({"insert" : 1}));
});
app.post('/login', (req, response, next) => {
	var gg = {
	};
	var url = require("url");
	var tmp = {}
	req.url.split("?")[1].split('&').forEach(ar => tmp[ar.split('=')[0]] = ar.split('=')[1]);
	console.log(`SELECT * FROM user where name = '${tmp.login}'`)
	connection.query(`SELECT * FROM user where name = '${tmp.login}' AND pass = '${tmp.password}'`, function (error, results, fields) {
		if (error) throw error;
		console.log(tmp, results)
		if (!results.length) {
			gg.auth = "fail"
			console.log(gg, !results.length)
			response.setHeader("access-control-allow-origin", "*")
			response.send(JSON.stringify(gg));
		}
		else {
			const id = results[0].id
			var chat = {}, resChat = [];
		connection.query(`SELECT one, two, whom, body, date from friends, chat where friends.id = chat.friendsID and ((one != ${id} and two = ${id}) or (one = ${id} and two != ${id}))`, function (error, results, fields) {
		  if (error) throw error;
		  console.log('The solution is: ', results);
		  resChat = results;
		});
				connection.query(`SELECT user.id, user.name, user.img, task.id as taskId, task.status, task.body FROM user, taskUser, task WHERE user.id = taskUser.userID and taskUser.taskID = task.id`, (er, res) => {
				if (er) throw er
				// connection.query(`SELECT one, two, whom, body, date from friends, chat where friends.id = chat.friendsID and ((one != ${id} and two = ${id}) or (one = ${id} and two != ${id}))`, (er, resChat) => {
				// 	if (er) throw er;
					console.log(resChat)
					res.map((el) => chat[el.id] = [])
					resChat.map((el) => {
						if (el.one == id) chat[el.two].push({"id":el.date, "text" : el.body, "whom": el.whom})
						if (el.one !== id) chat[el.one].push({"id":el.date, "text" : el.body, "whom": 1 - el.whom})
					})
					var friendList = res.map((el) => {
						if (gg[el.id]) {
							console.log
							gg[el.id].tasks.push({"id" : el.taskId, "status": el.status, "text" : el.body, "pbl" : el.pbl})
						}
						else {
							gg[el.id] = {
								"id" : el.id,
								"img" : el.img,
								"name" : el.name,
								"tasks" : [{"id" : el.taskId, "status": el.status, "text" : el.body}],
								"chat" : chat[el.id]
							}
						}
					})

					let returnValues = [];
					for (var val in gg) {
						returnValues.push(gg[val])
					}
					console.log(returnValues)
					response.setHeader("access-control-allow-origin", "*")
					response.send(JSON.stringify(returnValues));
				// })
				// connection.query(`ELECT task.id, task.status, task.body FROM user, taskUser, task WHERE user.id = taskUser.userID and taskUser.taskID = task.id and user.id = ${id}`, (er, res) => {
				// 	if (er) throw er
				// 	var friendList = res.map((el) => {return el.one !== tmp.login ? el.two : el.one;})
				// 	console.log(friendList)
					
				// })
			})	

		}
		// connection.end();
	});

});
app.listen(app.get('port'), () => {
	console.log('App started on port', app.get('port'));
});
module.exports = app;