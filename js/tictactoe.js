// var board = [[0, 0, 0]
//              [0, 0, 0]
//              [0, 0, 0]];

var turn = 0;

var toggleTurn = function(player){
  return (player === 0) ? turn += 1 : player = 0;
}

var checkWin = function(player, board){
  var mark = player + 1;
  win = false;

  for(var i = 0; i < board.length; i++){
    if(board[i][i] === mark && board[i+1][i] === mark && board[i+2][i] === mark){
      win = true;
    }
    if(board[i][0] === mark && board[i][1] === mark && board[i][2] === mark){
      win = true;
    }

    if(board[i][1] === mark && board[i+1][1] === mark && board[i+2][2]){
      win = true;
    }

    if(board[i][2] === mark && board[i+1][1] === mark && board[i+2][0]){
      win = true;
    }
    return win;
  }
}

var player = 0;
var tests = function(){
  var board = [[1, 0, 0],
              [0, 1, 0],
              [0, 0, 1]];
  console.log(checkWin(player, board));
};
