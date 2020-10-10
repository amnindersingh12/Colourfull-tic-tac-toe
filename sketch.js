//Inspired by the Coding Train and his Coding Challenge
// Made with <3 By Amninder Singh
// Colourfull Tic Tac Toe 


let boardSize = 3;
let board = []

let currentPlayer
let players = ['O', 'X']
let w;
let h;

let winner = null
let isloop = true

function setup() {
  createCanvas(600, 600);
 
  
  w = width/boardSize;
  h = height/boardSize;
  
  initLabels()
  
  for(let i=0; i<boardSize; ++i) {
    let row = [];
    for(let j=0; j<boardSize; ++j) {
      row.push('');
    }
    board.push(row)
  }
  // boardSize = createSlider(2, 10, 3);
  currentPlayer = 1
}

function initLabels() {
  newGameBtn = createButton('New Game');
  // newGameBtn.position(200, width + 100,'inherit');
  newGameBtn.position(0,  10, 'relative');
   newGameBtn.style('font-size', '30px');
  newGameBtn.style('background-color', '#fae');
  newGameBtn.mousePressed(newGame);
  

  
  currentPlayer = 1
  
  turnP = createP(players[currentPlayer] + "'s Turn").style('background-color', '#FFF').style('font-size', '20px').style('padding', '5px')
  // turnP.position(200, width+120,'inherit');
    turnP.position(0, 50, 'relative');

  
  winnerP = createP('Currently No Winner').style('background-color', '#FFF').style('font-size', '20px').style('padding', '5px')
  // winnerP.position(550, width+75,'inherit');
  winnerP.position(0, 100, 'relative');

}

function newGame() {
  w = width/boardSize;
  h = height/boardSize;
  
  board = []
  
  for(let i=0; i<boardSize; ++i) {
    let row = [];
    for(let j=0; j<boardSize; ++j) {
      row.push('');
    }
    board.push(row)
  }

  currentPlayer = 1
  
  winner = null
  isloop = true
   winnerP.style('font-size', '22pt');
  winnerP.html('Currently No Winner')
  loop();
}

function isWinner() {
  for(let i=0;i<boardSize;++i) {
    let temp=board[i][0];
    if(temp=='') continue;
    for(let j=1;j<boardSize; ++j) {
      if(board[i][j] == '') {
        temp = '';
        break;
      }
      if(board[i][j] != temp) {
        temp = '';
        break;
      }
    }
    if(temp != '') {
      stroke(220, 0, 0);
      strokeWeight(8);
      line(w/4, w*(i+0.5), width-(w/4), w*(i+0.5))
      strokeWeight(4);
      stroke(0)
      return temp;
    }
  }
  
  for(let i=0;i<boardSize;++i) {
    let temp=board[0][i];
    if(temp=='') continue;
    for(let j=1;j<boardSize; ++j) {
      if(board[j][i] == '') {
        temp = '';
        break;
      }
      if(board[j][i] != temp) {
        temp = '';
        break;
      }
    }
    if(temp != '') {
      stroke(220, 0, 0);
      strokeWeight(8);
      line(w*(i+0.5), w/4, w*(i+0.5), height-(w/4))
      strokeWeight(4);
      stroke(0)
      return temp;
    }
  }
  
  let temp=board[0][0];
  if(temp != '') {
    for(let i=1;i<boardSize;++i) {
      if(board[i][i] == '') {
        temp = '';
        break;
      }
      if(board[i][i] != temp) {
        temp = '';
        break;
      }
    }
  }
  if(temp != '') {
    stroke(220, 0, 0);
    strokeWeight(8);
    line(w/4, w/4, width-(w/4), height-(w/4))
    strokeWeight(4);
    stroke(0)
    return temp;
  }
  
  temp=board[0][boardSize-1];
  if(temp != '') {
    for(let i=1;i<boardSize;++i) {
      if(board[i][boardSize-1-i] == '') {
        temp = '';
        break;
      }
      if(board[i][boardSize-1-i] != temp) {
        temp = '';
        break;
      }
    }
  }
  if(temp != '') {
    stroke(220, 0, 0);
    strokeWeight(8);
    line(width-(w/4), w/4, w/4, height-(w/4))
    strokeWeight(4);
    stroke(0)
    return temp;
  }
  
  for(let i=0; i<boardSize; ++i) {
    for(let j=0; j<boardSize; ++j) {
      if(board[i][j] == '') return null;
    }
  }
  return 'TIE';
}

function mousePressed() {
  if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let j=Math.floor(mouseX/w);
    let i=Math.floor(mouseY/h);
    if(board[i][j] != '') return;
    board[i][j] = players[currentPlayer];
    currentPlayer = 1-currentPlayer;
  }
}

function updateText() {
  turnP.style('font-size', '20px');
  turnP.html(players[currentPlayer] + "'s Turn")
}

function draw() {
  if(isloop) {
    background('#fae');  
    updateText();
  
    strokeWeight(2);
    noFill();
  
    for(let i=1; i<boardSize; ++i) {
      line(0, h*i, width, h*i);
      line(w*i, 0, w*i, height);
    }
  
      for(let i=0; i<boardSize; ++i) {
      for(let j=0; j<boardSize; ++j) {
        let x=(w*j)+(w/2);
        let y=(h*i)+(h/2);
        let xr = w/4;
        let yr = h/4;
      
        if(board[i][j]=='X') {
          line(x-xr, y-yr, x+xr, y+yr);
          line(x+xr, y-yr, x-xr, y+yr);
        }
        else if(board[i][j]=='O') {
          ellipseMode(CENTER);
          ellipse(x, y, xr*2, yr*2);
        }
      }
    }
  
    
    winner = isWinner();
   
    if(winner) {
      if(winner == 'TIE')
        winnerP.html(winner);
      else
        winnerP.html(winner + ' is Winner')
        isloop = false
    }
  }
}
