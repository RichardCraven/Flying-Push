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
    socket.emit('enters name FROM CLIENT', name);
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
    setTimeout(show1, 100);
    setTimeout(show2, 7000);
    setTimeout(show3, 14000);
    // setTimeout(show4, 8000);
    // setTimeout(show5, 10000);
    // setTimeout(show6, 12000);
    // setTimeout(show7, 14000);
    }
function show1() {
    socket.emit('lvl1.1 FROM CLIENT');
    console.log(yourPoints)
}
socket.on('lvl1.1 FROM SERVER', function(data){
    console.log(new Date().toLocaleTimeString())
    $('.wordFlash').show(200);
    $('.wordFlash').text(data);
    setTimeout(function(){
    $('.wordFlash').text('');
    $('.wordFlash').hide(200);
    },6000)
});
socket.on('text input FROM SERVER', function(msg) {
    console.log(msg);
    console.log($('.wordFlash').text())
    console.log(yourPoints)
  
    if (msg === $('.wordFlash').text()){
      $('.yourPoints > div:first-child').css("background-color","green");
      console.log('check1'+yourPoints)
      yourPoints+= 1;
      console.log('check2'+yourPoints)
      $("#pointCount").html(yourPoints);
    }
  });

function show2() {
    socket.emit('lvl1.2 FROM CLIENT');
}
socket.on('lvl1.2 FROM SERVER', function(data){
    console.log('show2 begins' + (new Date()).toLocaleTimeString())
    $('.wordFlash').show(200);
    $('.wordFlash').text(data);
    setTimeout(function(){
    $('.wordFlash').text('');
    $('.wordFlash').hide(200);
    },6000)
});
function show3() {
    socket.emit('lvl1.3 FROM CLIENT');
}
socket.on('lvl1.3 FROM SERVER', function(data){
    console.log('show3 begins' + (new Date()).toLocaleTimeString())
    $('.wordFlash').show(200);
    $('.wordFlash').text(data);
    setTimeout(function(){
    $('.wordFlash').text('');
    $('.wordFlash').hide(200);
    },6000)
});
    timedText();
    console.log('timeText called')
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