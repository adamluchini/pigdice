function Player(){
  this.total = 0;
  this.round = 0;
}

Player.prototype.hold = function(){
  this.total += this.round;
  this.round = 0;
  $('#player' + turn).text(players[turn].total);

  var winners = winCondition(players);
  if(turn === players.length - 1){
    if(winners.length > 0){
      winners.forEach(function(winner){
        $('#winners').append("<p>" + winner + "</p>");
      });
      $('.play-buttons').prop("disabled",true);
      $('#new-game').toggle();
      //$('#game-board').toggle();
    }
  }

  if(turn === players.length - 1){
    turn = 0;
  } else {
    turn += 1;
  }
  $('#player-turn p').text(turn + 1);
  // var winners = winCondition(players);
  // if(turn + 1 = p)
  // if(winners.length > 0){
  //   $('#winners').append(winners);
  // }


}

var checkDice = function(player, score, rules){
  if(rules === 1){
    //traditional ruleset
    if(score > 1){
      player.round += score;
    } else {
      player.round = 0;
      player.hold();
    }

  } else if(rules === 2){

  } else if(rules === 3){

  } else {

  }
  //console.log(player.round);
  $('#score').text("");
  $('#score').append(player.round);

};

var roller = function(){
  return Math.floor(Math.random() * (6)) + 1;
}

var winCondition = function(players){
  var playerLen = players.length;
  var winners = []
  for(var i = 0; i < playerLen; i++){
    if(players[i].total >= 10){
      winners.push(i + 1);
    }
  }
  return winners;
}

// object/method testing
var test = function(){
  var me = new Player();
  var roll1 = 6;
  var roll2 = 4;
  checkDice(me, roll1, 1);
  checkDice(me, roll2, 1);
  me.hold();
  players.push(me);
  console.log(winCondition(players));

}

var players = [];

//temporary for testing
var rules = 1;
var turn = 0;
var round = 0;

//interface
$(function(){
  $('#new-game').submit(function(event){
    event.preventDefault();
    //$('#game-board').toggle();
    var numPlayers = parseInt($('select#num-players-sel').val());
    $('.play-buttons').prop("disabled",false);
    $('#player-bank').text("");
    $('#player-bank').prepend("<h2>Player Points</h2>");
    var i = 0;
    while(i < numPlayers){
      players[i] = new Player();
      // <li>Player 1: <span id="player0"></span></li>
      var string = "<p>Player " + (i+1) + ': <span id="player' + i + '">0</span></p>';
      $('#player-bank').append(string);
      console.log(string);
      i++
    }

    $('#round-total').text("");
    $('#round-total').prepend("<h2>Round Total</h2>");
    $('#roll-dice-button').show();
    $('#new-game').toggle();
    $('#player-turn').show();
    $('#hold-button').show();
    $('#round-total').show();
    $('#winner-box').show();
    $('#player-turn p').text(turn + 1);
  });

  $('#roll-dice-button').click(function(event){
    var rando = roller();
    var hex = 9855 + rando;

    $('#die-face').html('&#' + hex + ";");
    checkDice(players[turn], rando, rules);
  });

  $('#hold-button').click(function(event){
    players[turn].hold();
    //turn += 1;
    $('#die-face').text("");
    $('#player-turn p').text(turn + 1);
  });

})
