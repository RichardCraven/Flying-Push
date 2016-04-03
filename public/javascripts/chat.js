$(function() {
  var socket = io();  //<--- HANDSHAKE
  var $m = $("#m");
  $('.wordFlash').hide();
  $('#name-input').focus();
  //CLOCK
  setInterval(function(){
    $("#time").html((new Date()).toLocaleTimeString());
}, 1000);

  var d = new Date();

  var yourPoints = 0
  $("#pointCount").html(yourPoints);

    
  // var time = d.toLocaleTimeString()
  // $("#time").html(time);


  $('#nameForm').on('submit', function(e){
    e.preventDefault();
    var name = $('#name-input').val();
    $('#name-input').val('');
    $('#nameForm').hide();
    socket.emit('nameSubmit', name);
    console.log('is thiS the beginning?')
    
  })

  $("#messageForm").on('submit', function(e) {
    e.preventDefault();
    var msg = $m.val();
    socket.emit('text input FROM CLIENT', msg);
    console.log('client' +msg);
    $m.val('');
  });

  
  // socket.on('login message', function(poop){
  // 	$('#messages').append($('<li>' + poop + '</li>'));
  // })

  socket.on('enters name FROM SERVER', function(name){
      console.log(yourPoints)
      $('#m').focus();
      $('#messages').append('<li><strong>' + name + '</strong>' + " has entered!" + '</li>');
      $('.introMessage').hide(3300);
      setTimeout(function() {
        $('#messages').text('');
        $('#messages').append('<li><strong>' + name + '</strong>' + ", are you ready?" + '</li>');
                setTimeout(function() {
                  $('#messages').text('');
                  $('#messages').append('<li id="beginMessage"><strong>' + "BEGIN!" + '</strong>' + '</li>');
                        setTimeout(function() {
                           $('#beginMessage').hide(300);
                           socket.emit('begin FROM CLIENT');
                        }, 900);
                }, 2000);
      }, 2500);
  })
  
  socket.on('begin FROM SERVER', function(e){
      function timedText() {
      console.log('start sequence')
    setTimeout(show1, 1000);
    setTimeout(show2, 5000);
    setTimeout(show3, 10000);
    setTimeout(show4, 15000);
    setTimeout(show5, 20000);
    // setTimeout(show6, 26000);
    // setTimeout(show7, 31000);
    }
function show1() {
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
socket.on('text input FROM SERVER', function(msg) {
    console.log(msg);
    console.log($('.wordFlash').text())
    console.log(yourPoints)
  
    if (msg === $('.wordFlash').text()){
      $('.yourPoints > div:first-child').css("background-color","green");
      yourPoints+= 1;
      $("#pointCount").html(yourPoints);
    }
  });

function show2() {
    socket.emit('lvl1.2 FROM CLIENT');
}
socket.on('lvl1.2 FROM SERVER', function(data){
    console.log('show2 begins' + (new Date()).toLocaleTimeString())
    console.log(data);
    $('.wordFlash').show(200);
    $('.wordFlash').text(data);
    setTimeout(function(){
    $('.wordFlash').text('');
    $('.wordFlash').hide(200);
    },3000)
});
function show3() {
    socket.emit('lvl1.3 FROM CLIENT');
}
socket.on('lvl1.3 FROM SERVER', function(data){
    console.log('show3 begins' + (new Date()).toLocaleTimeString())
    console.log(data);
    $('.wordFlash').show(200);
    $('.wordFlash').text(data);
    setTimeout(function(){
    $('.wordFlash').text('');
    $('.wordFlash').hide(200);
    },3000)
});
function show4() {
    socket.emit('lvl1.4 FROM CLIENT');
}
socket.on('lvl1.4 FROM SERVER', function(data){
    console.log('show4 begins' + (new Date()).toLocaleTimeString())
    console.log(data);
    $('.wordFlash').show(200);
    $('.wordFlash').text(data);
    setTimeout(function(){
    $('.wordFlash').text('');
    $('.wordFlash').hide(200);
    },3000)
});
function show5() {
    socket.emit('lvl1.5 FROM CLIENT');
}
socket.on('lvl1.5 FROM SERVER', function(data){
    console.log('show5 begins' + (new Date()).toLocaleTimeString())
    console.log(data);
    $('.wordFlash').show(200);
    $('.wordFlash').text(data);
    setTimeout(function(){
    $('.wordFlash').text('');
    $('.wordFlash').hide(200);
    },3000)
});
    timedText();
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
    
  })

});