var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var fs = require('fs');

let userid = 0;

app.get('/yourroute', function(req, res) {
  res.send("stuff");
});

app.post('/create/:name/:age', function(req, res) {
  let storage = fs.readFileSync(__dirname + '/storage.json', "utf8");
  let data = JSON.parse(storage);
  userid = String(data.length + 1);
  let obj = {
    id: userid,
    name: req.params.name,
    age: req.params.age
  };
  data.push(obj);
  fs.writeFileSync(__dirname + '/storage.json', JSON.stringify(data));
  res.send(data);
});

app.get('/', function(req, res) {
  let storage = fs.readFileSync(__dirname + '/storage.json', "utf8");
  let data = JSON.parse(storage);
  res.send(data);
})

app.get('/:id', function(req, res) {
  let storage = fs.readFileSync(__dirname + '/storage.json', "utf8");
  let data = JSON.parse(storage);
  data.forEach(element => {
    if(element["id"] === req.params.id){
      res.send(element);
    }
  });
  res.sendStatus(400);
})

app.use(function(req, res) {
  res.sendStatus(404);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});
