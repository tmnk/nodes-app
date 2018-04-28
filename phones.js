const express = require('express');
const app = express();
var qs = require('querystring');
const articles = [{ title: 'Example' }];
var ggg = [{
   "test1":"value1",
   "test2":{
      "test2_in":"internal value test2"
    }
}];
app.set('port', process.env.PORT || 3000);
app.get('/articles', (req, res, next) => {
    var gg = [{
       "test1":"value1",
       "test2":{
          "test2_in":"internal value test2"
        }
    }];
    var url = require("url");
    var parts = url.parse(req.url, true);
    console.log(parts.query.data)
    res.setHeader("access-control-allow-origin", "*")
    res.send(JSON.stringify(ggg));
});

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
    res.send(JSON.stringify(ggg));
});
app.listen(app.get('port'), () => {
    console.log('App started on port', app.get('port'));
});
module.exports = app;


function pushPhones() {
      var JsonData = {
        "test1":"value1",
        "test2":{
             "test2_in":"internal value test2"
        }
      }; 
      var SendXhr = function(xhr) {
          xhr.setRequestHeader("content-type", "application/json; charset=utf-8");
          xhr.setRequestHeader("access-control-allow-origin", "*");
      };

      $.ajax({
          url:"http://localhost:3000/articles?data=home&gogo=child",
          type:'POST',
          // headers: {"access-control-allow-origin", "*" },
          dataType:"json",
          // data: {"data":"gg"},
          success: function(data) {
            console.log(data[0].test2.test2_in);
          },
          error:function (data) {
              console.log( data );
          },
           // beforeSend : SendXhr
      });
    }