var express = require('express');
var app = express();
require('locus');
var server = require('http').Server(app);
var io = require('socket.io')(server);
var users = [];

var lvl1words = require('./myModules/lvl1_words');
var lvl2words = require('./myModules/lvl2_words');
var lvlNames = require('./myModules/lvlNames');
var player1 = false
var player2 = false
var start = false


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

  socket.on('nameSubmit', function(name){
    console.log(socket.id)
    var user = {};
    user.name = name;
    user.id = socket.id
    if (player1 === false){
      user.player = 1;
      player1 = true;
      users.push(user);
      io.sockets.connected[users[0].id].emit("start sequence message 1 FROM SERVER", name);
      // io.sockets.connected[users[1].id].emit("start sequence message 2 FROM SERVER", name);
    }
    else if (player1 ===true && player2 === false){
      user.player = 2;
      player2 = true;
      users.push(user);
      io.sockets.connected[users[1].id].emit("start sequence message 2 FROM SERVER", name);
      io.sockets.connected[users[0].id].emit("start sequence message 2 FROM SERVER", name);
      }
    // eval(locus);

    // else if (player1 ===true && player2 ===true){
    //   alert('sorry, this game only supports 2 players')
    // }
  })
  socket.on('Im ready', function(){
    io.emit('ready check');
  })
  socket.on('final begin CLIENT', function(){
    io.emit('start sequence final FROM SERVER');
  })

  socket.on('begin FROM CLIENT', function(){
    console.log('received client begin');
    io.emit('begin FROM SERVER');
  })

  socket.on('lvl1Activated', function(){
    if (socket.id === users[0].id){
    var name = users[0].name;
    io.emit('level1 change', name)
    }
    else if (socket.id === users[1].id){
    var name = users[1].name;
    io.emit('level1 change', name)
    }
  })
  socket.on('lvl2Activated', function(){
    if (socket.id === users[0].id){
    var name = users[0].name;
    io.emit('level2 change', name)
    }
    else if (socket.id === users[1].id){
    var name = users[1].name;
    io.emit('level2 change', name)
    }
  })
  socket.on('lvlNamesActivated', function(){
    if (socket.id === users[0].id){
    var name = users[0].name;
    io.emit('levelNames change', name)
    }
    else if (socket.id === users[1].id){
    var name = users[1].name;
    io.emit('levelNames change', name)
    }
  })


  socket.on('begin FROM CLIENT-lvl1', 
    function(){
    var data = getRandom(lvl1words);
    io.emit('BEGIN game FROM SERVER', data)
  })
  socket.on('begin FROM CLIENT-lvl2', 
    function(){
    var data = getRandom(lvl2words);
    io.emit('BEGIN game FROM SERVER', data)
  })
  socket.on('begin FROM CLIENT-names', 
    function(){
    var data = getRandom(lvlNames);
    io.emit('BEGIN game FROM SERVER', data)
  })

  socket.on('input FROM CLIENT', function(msg){
    if (socket.id === users[0].id){
    io.sockets.connected[users[0].id].emit('hit check', msg)
    }
    else if (socket.id === users[1].id){
    io.sockets.connected[users[1].id].emit('hit check', msg)
    }
  });
  socket.on('I hit', function(){
    if (socket.id === users[0].id){
    io.sockets.connected[users[1].id].emit('they hit')
    }
    else if (socket.id === users[1].id){
    io.sockets.connected[users[0].id].emit('they hit')
    }
  });
  socket.on('stopGame', function(){
    if (socket.id === users[0].id){
    io.sockets.connected[users[0].id].emit('winMessage', users[0].name);
    io.sockets.connected[users[1].id].emit('loseMessage', users[1].name)
    }
    else if (socket.id === users[1].id){
    io.sockets.connected[users[1].id].emit('winMessage', users[1].name);
    io.sockets.connected[users[0].id].emit('loseMessage', users[0].name)
    }
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