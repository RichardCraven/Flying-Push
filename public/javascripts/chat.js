$(function() {
  var socket = io();  //<--- HANDSHAKE
  var $m = $("#m");
  $('.wordFlash').hide();
  $('#name-input').focus();
  //CLOCK
  setInterval(function(){
    $("#time").html((new Date()).toLocaleTimeString());
}, 1000);
stopGame();
var d = new Date();

var yourPoints = 0
var theirPoints = 0
$("#pointCount").html(yourPoints);

var startgame;
  

$('#nameForm').on('submit', function(e){
  e.preventDefault();
  var name = $('#name-input').val();
  $('#name-input').val('');
  $('#nameForm').hide();
  socket.emit('nameSubmit', name);
  
})

$("#messageForm").on('submit', function(e) {
  e.preventDefault();
  var msg = $m.val();
  socket.emit('input FROM CLIENT', msg);
  console.log('client' +msg);
  $m.val('');
});


// socket.on('login message', function(poop){
// 	$('#messages').append($('<li>' + poop + '</li>'));
// })
socket.on('start sequence message 1 FROM SERVER', function(name){
    $('#m').focus();
    $('#messages').append('<li><strong>' + name + '</strong>' + " has entered!" + '</li>');
    $('.introMessage').hide(3300);
    setTimeout(function(){
      $('#messages').text('');
      $('#messages').append('Waiting for player 2...');
    }, 2000)
});
socket.on('start sequence message 2 FROM SERVER', function(name){
  console.log('ok lets see')
    $('#m').focus();
    $('#messages').append('<li><strong>' + name + '</strong>' + " has entered!" + '</li>');
    $('.introMessage').hide(3300);
    setTimeout(function(){
      $('#messages').text('');
      $('#messages').append('The game is about to begin...').css('color','blue');
    }, 2000)
    setTimeout(function(){
      $('#messages').text('');
      socket.emit('final begin CLIENT');
    }, 4000)
});

socket.on('start sequence final FROM SERVER', function(name){
    console.log(yourPoints)
    $('#m').focus();
    $('#messages').append('<li><strong>' + name + '</strong>' + ", are you ready?" + '</li>');
    setTimeout(function() {
      $('#messages').text('');
      $('#messages').append('<li id="beginMessage"><strong>' + "BEGIN!" + '</strong>' + '</li>');
        setTimeout(function() {
           $('#beginMessage').hide(300);
           socket.emit('begin FROM CLIENT');
        }, 900);
              
    }, 2500);
})

socket.on('begin FROM SERVER', function(e){
    console.log('begin from server')
    return startGame()
});
function startGame(){
  show1();
  startgame = setInterval(show1,5000);
}
function stopGame(){
  clearInterval(startgame);
}
function show1(){
  socket.emit('lvl1.1 FROM CLIENT');
}
socket.on('lvl1.1 FROM SERVER', function(data){
  console.log('show1 begins' + (new Date()).toLocaleTimeString())
  console.log(data);
  $('.wordFlash').show(200);
  $('.wordFlash').text(data);
  setTimeout(function(){
  $('.wordFlash').text('');
  $('.wordFlash').hide(200);
  },3000)
});



socket.on('hit check', function(msg) {
  console.log(msg);
  if (yourPoints === 0 && msg === $('.wordFlash').text()){
    $('.yourPoints > div:first-of-type').css("background-color","green");
    $('.yourPoints > div:first-of-type').addClass("filledGreen");
    yourPoints+= 1;
    socket.emit('I hit');
  }
  else if (yourPoints === 5 && msg === $('.wordFlash').text()){
      $('.yourPoints > .filledGreen + div').css("background-color","green");
      $('.yourPoints > .filledGreen + div').addClass("filledGreen");
      yourPoints+= 1;
      $('#messages').text('');
      $('#messages').text('YOU WIN!!!');
      socket.emit('stopGame');
      }
  else if (msg === $('.wordFlash').text()){
    $('.yourPoints > .filledGreen + div').css("background-color","green");
    $('.yourPoints > .filledGreen + div').addClass("filledGreen");
    yourPoints+= 1;
    socket.emit('I hit');
  }
});

socket.on('they hit', function(){
  if (theirPoints === 0){
    $('.enemyPoints > div:first-of-type').css("background-color","red");
    $('.enemyPoints > div:first-of-type').addClass("filledRed");
    theirPoints+= 1;
  }
  else if (theirPoints === 5){
      $('.enemyPoints > .filledRed + div').css("background-color","red");
      $('.enemyPoints > .filledRed + div').addClass("filledRed");
      theirPoints+= 1;
      $('#messages').text('');
  }
  else {
    $('.enemyPoints > .filledRed + div').css("background-color","red");
    $('.enemyPoints > .filledRed + div').addClass("filledRed");
    theirPoints+= 1;
  }
});
socket.on('winMessage', function(name){
    $('#messages').text(name + ', YOU WIN!!!');
    clearInterval(startgame);
    debugger
     console.log('this should end it')
     return stopGame();
});
socket.on('loseMessage', function(name){
    $('#messages').text(name + ', YOU LOSE!!!');
    clearInterval(startgame);
    debugger
    console.log('this should end it')
     return stopGame();
});

 // timedText();
    // $('.wordFlash').show(500);
    // setTimeout(function() {
    // $('.wordFlash').text('parse the buns in the cornfield');
    //   setTimeout(function() {
    //     $('.wordFlash').hide(500);
    //       setTimeout(function() {
    //         $('.wordFlash').show(500);
    //         $('.wordFlash').text('quantum dairy-maids are gating into my world');
    //           setTimeout(function() {
    //             $('.wordFlash').hide(500);
    //             setTimeout(function() {
    //               $('.wordFlash').show(500);
    //               $('.wordFlash').text('cannibal query selectors brew ha ha');
    //             }, 1000);
    //           }, 2500);  
    //       },1000);
    //   }, 2000);
    // }, 500);
    
 });
