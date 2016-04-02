var express = require('express');
var app = express();
require('locus');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var users = [];

var lvl1words = require('./myModules/lvl1_words');

function getRandom(arr){
  return arr[Math.floor(Math.random()*arr.length)];
}


// setTimeout(function(){
//   greet(randomGreeting);
// }, 1000);



io.on('connection', function(socket){
  // var login = "You've joined the chat"
  // io.emit('login message', login);
  // var userName = prompt("What is your name?");
  // io.emit('name', userName);
  socket.on('text input FROM CLIENT', function(msg){
    io.emit('text input FROM SERVER', msg); //io.emit emits to all clients, socket.emit emits only to 1 client
    // eval(locus);
  });

  socket.on('enters name FROM CLIENT', function(name){
  	io.emit('enters name FROM SERVER', name)
  })

  socket.on('begin FROM CLIENT', function(){
    io.emit('begin FROM SERVER')
  })

  socket.on('lvl1.1 FROM CLIENT', function(){
    var data = getRandom(lvl1words);
    io.emit('lvl1.1 FROM SERVER', data)
  })
  socket.on('lvl1.2 FROM CLIENT', function(){
    var data = getRandom(lvl1words);
    io.emit('lvl1.2 FROM SERVER', data)
  })
  socket.on('lvl1.3 FROM CLIENT', function(){
    var data = getRandom(lvl1words);
    io.emit('lvl1.3 FROM SERVER', data)
  })

});

    function startTime() {
      var d = new Date();
      var h = d.getHours();
      var m = d.getMinutes();
      var s = d.getSeconds();
      m = checkTime(m);
      s = checkTime(s);
      var time = (h + ":" + m + ":" + s)
      $("#time").html(time);
    setTimeout(startTime(), 500);
    }
    function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
    } 

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index');
});

server.listen(3200, function() {
  console.log('listening on 3200');
});

module.exports = {
  users
}