const express = require('express');
const app = express();
var qs = require('querystring');
const articles = [{ title: 'Example' }];


app.post('/articles', (req, res, next) => {
	var gg = {
	   "test1":"value1",
	   "test2":{
	      "test2_in":"internal value test2"
	    }
	};
	var url = require("url");
	// var parts = url.parse(req.url, true);
	// console.log(arts.query.data)
	var tmp = {}
	req.url.split("?")[1].split('&').forEach(ar => tmp[ar.split('=')[1]] = ar.split('=')[1]);

	console.log(tmp)
	res.setHeader("access-control-allow-origin", "*")
	res.send(JSON.stringify(gg));
});
app.listen(app.get('port'), () => {
	console.log('App started on port', app.get('port'));
});
module.exports = app;