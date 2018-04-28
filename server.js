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


app.set('port', process.env.PORT || 3000);


app.post('/articles', (req, res, next) => {
	var gg = [{
	   "test1":"value1",
	   "test2":{
	      "test2_in":"internal value test2"
	    }
	}];
	var url = require("url");
	// var parts = url.parse(req.url, true);
	// console.log(arts.query.data)
	var tmp = {}
	req.url.split("?")[1].split('&').forEach(ar => tmp[ar.split('=')[0]] = ar.split('=')[1]);

	console.log(tmp)
	res.setHeader("access-control-allow-origin", "*")
	res.send(JSON.stringify(gg));
});
app.post('/login', (req, res, next) => {
	var gg = {
	   "auth":"complete"
	};
	var url = require("url");
	// var parts = url.parse(req.url, true);
	// console.log(arts.query.data)
	var tmp = {}
	req.url.split("?")[1].split('&').forEach(ar => tmp[ar.split('=')[0]] = ar.split('=')[1]);
	console.log(`SELECT * FROM user where name = '${tmp.login}'`)
	connection.query(`SELECT * FROM user where name = '${tmp.login}' AND pass = '${tmp.password}'`, function (error, results, fields) {
		if (error) throw error;
		console.log(tmp, results)
		if (!results.length) gg.auth = "fail"
			console.log(gg, !results.length)
		res.setHeader("access-control-allow-origin", "*")
		res.send(JSON.stringify(gg));
		connection.end();
	});

});
app.listen(app.get('port'), () => {
	console.log('App started on port', app.get('port'));
});
module.exports = app;