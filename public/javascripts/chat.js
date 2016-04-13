$(function() {
  var socket = io();  //<--- HANDSHAKE
  var $m = $("#m");
  $('.wordFlash').hide();
  $('#name-input').focus();
  //CLOCK
  setInterval(function(){
    $("#time").html((new Date()).toLocaleTimeString());
}, 1000);
$('.ready').hide();
var d = new Date();
var lvl1 = true;
var lvl2 = false;
var lvlNames = false;

var gameOver = false;
var registered = false;
var ready1 = false;
var ready2 = false;

var wtfBEANS = false;
var startgame1;
var startgame2;
var startgameNames;

var yourPoints = 0
var theirPoints = 0
$("#pointCount").html(yourPoints);

var startgame;

//LEVEL BUTTONS
$('#level1').on('click',function(e){
  e.preventDefault();
  if (registered === true && wtfBEANS === false){
  socket.emit('lvl1Activated')
  };
});
$('#level2').on('click',function(e){
  e.preventDefault();
  if (registered === true && wtfBEANS === false){
  socket.emit('lvl2Activated')
  };
});
$('#levelNames').on('click',function(e){
  e.preventDefault();
  if (registered === true && wtfBEANS === false){
  socket.emit('lvlNamesActivated')
};
});



$('#nameForm').on('submit', function(e){
  e.preventDefault();
  registered = true;
  var name = $('#name-input').val();
  $('#name-input').val('');
  $('#nameForm').hide();
  socket.emit('nameSubmit', name);
  
})

$("#messageForm").on('submit', function(e) {
  e.preventDefault();
  if($m.val() !== ''){
  var msg = $m.val();
  socket.emit('input FROM CLIENT', msg);
  console.log('client: ' +msg);
  $m.val('');
  };
});


// socket.on('login message', function(poop){
// 	$('#messages').append($('<li>' + poop + '</li>'));
// })
socket.on('connect', function(e){
  socket.emit('userConnected');
})
socket.on('disconnect', function(e){
  socket.emit('userDisconnected');
})

socket.on('level1 change', function(name){
  if (gameOver === false && lvl1 === false){
  lvl1 = true;
  lvl2 = false;
  lvlNames = false;
  $('#level1').addClass('selected');
  $('#level2').removeClass('selected');
  $('#levelNames').removeClass('selected');
  $('#messages').text('');
  $('#messages').append(name +' changed to level 1!');
  }
})
socket.on('level2 change', function(name){
  if (gameOver === false && lvl2 === false){
  lvl1 = false;
  lvl2 = true;
  lvlNames = false;
  $('#level1').removeClass('selected');
  $('#level2').addClass('selected');
  $('#levelNames').removeClass('selected');
  $('#messages').text('');
  $('#messages').append(name +' changed to level 2!');
  }
})
socket.on('levelNames change', function(name){
  if (gameOver === false && lvlNames === false){
  lvl1 = false;
  lvl2 = false;
  lvlNames = true;
  $('#level1').removeClass('selected');
  $('#level2').removeClass('selected');
  $('#levelNames').addClass('selected');
  $('#messages').text('');
  $('#messages').append(name +' changed to Names Level!');
  }
})



socket.on('start sequence message 1 FROM SERVER', function(name){
    console.log('wtf')
    $('#m').focus();
    $('#messages').append('<li><strong>' + name + '</strong>' + " has entered!" + '</li>');
    $('.introMessage').hide(3300);
    setTimeout(function(){
      $('#messages').text('');
      $('#messages').append('Waiting for other player...');
    }, 2000)
});
socket.on('start sequence message 2 FROM SERVER', function(name){
    $('#m').focus();
    $('#messages').append('<li><strong>' + name + '</strong>' + " has entered!" + '</li>');
    $('.introMessage').hide(3300);
    setTimeout(function(){
      $('#messages').text('');
      $('#messages').append('Are you ready?');
      $('.ready').show(200);
    }, 2000)
});

$('.ready').on('click',function(e){
  e.preventDefault();
  $('#messages').text('');
  socket.emit('Im ready');
});
socket.on('ready check', function(){
  if (ready1 === false){
    ready1 = true;
    $('#messages').text('waiting for other player');
    $('.ready').addClass('selected');
  }
  else if (ready1 === true && ready2 ===false){
    ready2 = true;
    $('.ready').addClass('selected');
    socket.emit('final begin CLIENT');
  }

})

socket.on('start sequence final FROM SERVER', function(name){
    wtfBEANS = true;
    $('.ready').hide(300);
    $('#m').focus();
    $('#messages').text("...and......");
    setTimeout(function() {
      $('#messages').text('');
      $('#messages').append('<li id="beginMessage"><strong>' + "BEGIN!" + '</strong>' + '</li>');
        setTimeout(function() {
           $('#beginMessage').hide(300);
           if (lvl1 === true && startgame1 === undefined){
            socket.emit('begin FROM CLIENT-lvl1');
            startgame1 = setInterval(startGame1,5000);
           }
           else if (lvl2 === true && startgame2 === undefined){
           socket.emit('begin FROM CLIENT-lvl2');
           startgame2 = setInterval(startGame2,5000); 
           }
           else if (lvlNames === true && startgameNames === undefined){
            socket.emit('begin FROM CLIENT-names');
            startgameNames = setInterval(startGameNames,5000);
           }
        }, 900);
              
    }, 2500);
})
function startGame1(){
  console.log('funnction works 1')
socket.emit('begin FROM CLIENT-lvl1');
}
function startGame2(){
  console.log('funnction works 2')
socket.emit('begin FROM CLIENT-lvl2');
}
function startGameNames(){
socket.emit('begin FROM CLIENT-names');
}


function stopGame(){
  clearInterval(startgame1);
  clearInterval(startgame2);
  clearInterval(startgameNames);
}

socket.on('BEGIN game FROM SERVER-lvl1', function(data){
  $('.wordFlash').show(200);
  $('.wordFlash').text(data);
  setTimeout(function(){
  $('.wordFlash').text('');
  $('.wordFlash').hide(200);
  },4400)
});

socket.on('BEGIN game FROM SERVER-lvl2', function(data){
  $('.wordFlash').show(200);
  $('.wordFlash').text(data);
  setTimeout(function(){
  $('.wordFlash').text('');
  $('.wordFlash').hide(200);
  },3000)
});

socket.on('BEGIN game FROM SERVER-names', function(data){
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
    console.log('condition 1')
  }
  else if (yourPoints === 5 && msg === $('.wordFlash').text()){
      $('.yourPoints > .filledGreen + div').css("background-color","green");
      $('.yourPoints > .filledGreen + div').addClass("filledGreen");
      yourPoints+= 1;
      $('#messages').text('');
      $('#messages').text('YOU WIN!!!');
      socket.emit('stopGame');
    console.log('condition 2')
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
     console.log('this should end it')
     gameOver = true;
     return stopGame();
});
socket.on('loseMessage', function(name){
    $('#messages').text(name + ', YOU LOSE!!!');
    clearInterval(startgame);
    gameOver = true;
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
