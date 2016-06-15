function Player(){
  this.total = 0;
  this.round = 0;
}

Player.prototype.hold = function(){
  this.total += this.round;
  this.round = 0;
  $('#player' + newGame.turn).text(newGame.players[newGame.turn].total);
  var players = newGame.players;
  var winners = newGame.winCondition(players);
  if(newGame.turn === players.length - 1){
    if(winners.length > 0){
      winners.forEach(function(winner){
        $('#winners').append("<p>" + winner + "</p>");
      });
      $('.play-buttons').prop("disabled",true);
      $('#new-game').toggle();
      //$('#game-board').toggle();
    }
  }

  if(newGame.turn === players.length - 1){
    newGame.turn = 0;
  } else {
    newGame.turn += 1;
  }
  $('#player-turn p').text(newGame.turn + 1);

}

function Game(name, dice, players){
  this.name = name;
  this.dice = dice;
  this.players = players;
  this.turn = 0;
  this.round = 0;
}

Game.prototype.checkDice = function(dice){
  if(rules === 1){
    //traditional ruleset
    if(dice[0] > 1){
      this.players[this.turn].round += dice[0];
    } else {
      this.players[this.turn].round = 0;
      this.players[this.turn].hold();
    }
  } else if(rules === 2){

  } else if(rules === 3){

  } else {

  }
  $('#score').text("");
  $('#score').append(this.players[this.turn].round);

};

Game.prototype.roller = function(){
  var result = [];
  if(this.dice === 1){
    result.push(Math.floor(Math.random() * (6)) + 1);
  } else {
    for(var i = 0; i < this.dice; i++){
      result.push(Math.floor(Math.random() * (6)) + 1);
    }
  }
  return result;
}

Game.prototype.winCondition = function(){

  var playerLen = this.players.length;
  var winners = []
  for(var i = 0; i < playerLen; i++){
    if(newGame.players[i].total >= 10){
      winners.push(i + 1);
    }
  }
  return winners;
}

var newGame = Object;


//temporary for testing
var rules = 1;

//interface
$(function(){
  $('#new-game').submit(function(event){
    event.preventDefault();

    $('.play-buttons').prop("disabled",false);
    $('#player-bank').text("");
    $('#player-bank').prepend("<h2>Player Points</h2>");

    var numPlayers = parseInt($('select#num-players-sel').val());
    var i = 0;
    var players = [];
    while(i < numPlayers){
      players[i] = new Player();
      var string = "<p>Player " + (i+1) + ': <span id="player' + i + '">0</span></p>';
      $('#player-bank').append(string);
      i++
    }

    var gameType = $('select#game-type-sel').val();
    var dice = 0;
    (gameType === "Pig") ? dice = 1 : dice = 2;

    newGame = new Game(gameType, dice, players);

    $('#round-total').text("");
    $('#round-total').prepend("<h2>Round Total</h2>");
    $('#roll-dice-button').show();
    $('#new-game').toggle();
    $('#player-turn').show();
    $('#hold-button').show();
    $('#round-total').show();
    $('#winner-box').show();
    $('#player-turn p').text(newGame.turn + 1);
  });

  $('#roll-dice-button').click(function(event){
    console.log(JSON.stringify(newGame));
    var rando = newGame.roller();

    $('#die-face').text("");
    rando.forEach(function(num){
      var hex = 9855 + num;
      $('#die-face').html('&#' + hex + ";");
    })

    newGame.checkDice(rando);
  });

  $('#hold-button').click(function(event){

    newGame.players[newGame.turn].hold();
    //turn += 1;
    $('#die-face').text("");
    $('#score').text("");
    $('#player-turn p').text(newGame.turn + 1);
  });

})
