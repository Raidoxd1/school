const table = document.getElementById('app');
let playerRow1 = 1; // Player 1's initial row position
let playerCol1 = 1; // Player 1's initial column position
let playerMoving1 = false; // Flag to track if Player 1 is currently moving

let playerRow2 = 17; // Player 2's initial row position
let playerCol2 = 17; // Player 2's initial column position
let playerMoving2 = false; // Flag to track if Player 2 is currently moving

let playerRow3 = 1; // Player 2's initial row position
let playerCol3 = 17; // Player 2's initial column position
let playerMoving3 = false; // Flag to track if Player 2 is currently moving

let playerRow4 = 17; // Player 2's initial row position
let playerCol4 = 1; // Player 2's initial column position
let playerMoving4 = false; // Flag to track if Player 2 is currently moving

function playerspeed1() {
  setTimeout(() => {
    playerMoving1 = false;
  }, 800);
}

function playerspeed2() {
  setTimeout(() => {
    playerMoving2 = false;
  }, 800);
}
function playerspeed3() {
  setTimeout(() => {
    playerMoving3 = false;
  }, 800);
}
function playerspeed4() {
  setTimeout(() => {
    playerMoving4 = false;
  }, 800);
}

const ws = new WebSocket(`ws://localhost:8080`);
let username = '';
let playerSocket = null; // Variable to store the player's socket information

ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.type === 'updatePlayer') {
    const { row, col } = data.position;
    updatePlayerPosition(row, col, data.username);
  } else if (data.type === 'username') {
    username = data.value;
  } else if (data.type === 'playerSocket') {
    playerSocket = data.value;
    createMap(); // Call createMap() once the player socket information is received
  }
});

const map = [
  '###################',
  '#P.           BB.P#',
  '#.# # # # # # # #.#',
  '#B               B#',
  '#B# # # # # # # #B#',
  '#                 #',
  '# # # # # # # # # #',
  '#                 #',
  '# # # # # # # # # #',
  '#                 #',
  '# # # # # # # # # #',
  '#                 #',
  '# # # # # # # # # #',
  '#                 #',
  '#B# # # # # # # # #',
  '#B                #',
  '#.# # # # # # # #.#',
  '#P.BB           .P#',
  '###################'
];

function createMap() {
  for (let row = 0; row < map.length; row++) {
    const tr = document.createElement('tr');

    for (let col = 0; col < map[row].length; col++) {
      const td = document.createElement('td');

      switch (map[row][col]) {
        case '#': // Wall
          td.classList.add('wall');
          break;
        case 'P': // Player starting position
          if (playerSocket==='player1' && col === 1 && row === 1) {
            td.classList.add('player1');
          } else if (playerSocket==='player2' && col === 17 && row === 17) {
            td.classList.add('player2');
          } else if (playerSocket==='player3' && col === 17 && row === 1) {
            td.classList.add('player3');
          } else if (playerSocket==='player4' && col === 1 && row === 17) {
            td.classList.add('player4');
          }
          break;
        case 'B': // Breakable block
          td.classList.add('breakable-block');
          break;
      }

      tr.appendChild(td);
    }

    table.appendChild(tr);
  }
}

function updatePlayerPosition(row, col, playerClass) {
  const playerCells = table.querySelectorAll(`.${playerClass}`);

  playerCells.forEach((cell) => {
    
    cell.classList.remove(playerClass);
  });

  const targetCell = table.rows[row].cells[col];
  targetCell.classList.add(playerClass);

  if (playerClass === 'player1') {
    playerRow1 = row;
    playerCol1 = col;
    
  } else if (playerClass === 'player2') {
    playerRow2 = row;
    playerCol2 = col;
    
  }else if (playerClass === 'player3') {
    playerRow3 = row;
    playerCol3 = col;
    
  }else if (playerClass === 'player4') {
    playerRow4 = row;
    playerCol4 = col;
    
  }
}






function movePlayer(rowOffset, colOffset) {
  if (username === 'player1' && !playerMoving1) {
    const targetRow = playerRow1 + rowOffset;
    const targetCol = playerCol1 + colOffset;

    if (
      targetRow >= 0 &&
      targetRow < table.rows.length &&
      targetCol >= 0 &&
      targetCol < table.rows[targetRow].cells.length &&
      map[targetRow][targetCol] !== '#' &&
      map[targetRow][targetCol] !== 'B'
    ) {
      playerMoving1 = true;
      playerspeed1();
      updatePlayerPosition(targetRow, targetCol, 'player1'); // Update player position on their own screen
      
      ws.send(
        JSON.stringify({
          type: 'updatePlayer',
          position: { row: targetRow, col: targetCol },
          username: 'player1' // Pass the username as 'player1'
        })
      );
    }
  } else if (username === 'player2' && !playerMoving2) {
    const targetRow = playerRow2 + rowOffset;
    const targetCol = playerCol2 + colOffset;

    if (
      targetRow >= 0 &&
      targetRow < table.rows.length &&
      targetCol >= 0 &&
      targetCol < table.rows[targetRow].cells.length &&
      map[targetRow][targetCol] !== '#' &&
      map[targetRow][targetCol] !== 'B'
    ) {
      playerMoving2 = true;
      playerspeed2();
      updatePlayerPosition(targetRow, targetCol, 'player2'); // Update player position on their own screen
      ws.send(
        JSON.stringify({
          type: 'updatePlayer',
          position: { row: targetRow, col: targetCol },
          username: 'player2' // Pass the username as 'player2'
        })
      );
    }
  }else if (username === 'player3' && !playerMoving3) {
    const targetRow = playerRow3 + rowOffset;
    const targetCol = playerCol3 + colOffset;

    if (
      targetRow >= 0 &&
      targetRow < table.rows.length &&
      targetCol >= 0 &&
      targetCol < table.rows[targetRow].cells.length &&
      map[targetRow][targetCol] !== '#' &&
      map[targetRow][targetCol] !== 'B'
    ) {
      playerMoving3 = true;
      playerspeed3();
      updatePlayerPosition(targetRow, targetCol, 'player3'); // Update player position on their own screen
      ws.send(
        JSON.stringify({
          type: 'updatePlayer',
          position: { row: targetRow, col: targetCol },
          username: 'player3' // Pass the username as 'player2'
        })
      );
    }
  }else if (username === 'player4' && !playerMoving4) {
    const targetRow = playerRow4 + rowOffset;
    const targetCol = playerCol4 + colOffset;

    if (
      targetRow >= 0 &&
      targetRow < table.rows.length &&
      targetCol >= 0 &&
      targetCol < table.rows[targetRow].cells.length &&
      map[targetRow][targetCol] !== '#' &&
      map[targetRow][targetCol] !== 'B'
    ) {
      playerMoving4 = true;
      playerspeed4();
      updatePlayerPosition(targetRow, targetCol, 'player4'); // Update player position on their own screen
      ws.send(
        JSON.stringify({
          type: 'updatePlayer',
          position: { row: targetRow, col: targetCol },
          username: 'player4' // Pass the username as 'player2'
        })
      );
    }
  }
}




document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    movePlayer(-1, 0);
  } else if (event.key === 'ArrowDown') {
    movePlayer(1, 0);
  } else if (event.key === 'ArrowLeft') {
    movePlayer(0, -1);
  } else if (event.key === 'ArrowRight') {
    movePlayer(0, 1);
  }
});

