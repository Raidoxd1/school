let playerRow1 = 1; // Player 1's initial row position
let playerCol1 = 1; // Player 1's initial column position
let playerMoving1 = false; // Flag to track if Player 1 is currently moving
let player1startspeed =0; 

let playerRow2 = 17; // Player 2's initial row position
let playerCol2 = 17; // Player 2's initial column position
let playerMoving2 = false; // Flag to track if Player 2 is currently moving
let player2startspeed =0;

let playerRow3 = 1; // Player 2's initial row position
let playerCol3 = 17; // Player 2's initial column position
let playerMoving3 = false; // Flag to track if Player 2 is currently moving
let player3startspeed =0;

let playerRow4 = 17; // Player 2's initial row position
let playerCol4 = 1; // Player 2's initial column position
let playerMoving4 = false; // Flag to track if Player 2 is currently moving
let player4startspeed =0;

function speed1() {
  return 800
}
function speed2() {
  return 600
}
function speed3() {
  return 400
}
function speed4() {
  return 200
}

function playerspeed1(speed) {
  setTimeout(() => {
    playerMoving1 = false;
  }, speed);
}

function playerspeed2(speed) {
  setTimeout(() => {
    playerMoving2 = false;
  }, speed);
}
function playerspeed3(speed) {
  setTimeout(() => {
    playerMoving3 = false;
  }, speed);
}
function playerspeed4(speed) {
  setTimeout(() => {
    playerMoving4 = false;
  }, speed);
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
  
  
  
  
    // Check if the target cell already has a bomb
    
  
  
  function movePlayer(rowOffset, colOffset) {
    if (username === 'player1' && !playerMoving1) {
      const targetRow = playerRow1 + rowOffset;
      const targetCol = playerCol1 + colOffset;
      const targetCell = table.rows[targetRow].cells[targetCol];
     
      if (
        
        !targetCell.querySelector('.bomb')&&
        targetRow >= 0 &&
        targetRow < table.rows.length &&
        targetCol >= 0 &&
        targetCol < table.rows[targetRow].cells.length &&
        targetCell.classList != 'breakable-block' &&
        targetCell.classList != 'wall' 
      ) {
        playerMoving1 = true;
        ////////move speed powerup
        if (targetCell.classList == 'speed') {
          player1startspeed++
          targetCell.classList.remove('speed')
        }
        if (player1startspeed==0){
          playerspeed1(speed1());
        }else if (player1startspeed==1){
          playerspeed1(speed2());
        }else if (player1startspeed==2){
          playerspeed1(speed3());
        }else if (player1startspeed==3){
          playerspeed1(speed4());
        }//////////
        ///////////more boms powerup
        if (targetCell.classList == 'more-bomb') {
          bombPlanted.player1++
          targetCell.classList.remove('more-bomb')
        }
        /////////////bigger bomb powerup
        if (targetCell.classList.contains('bigger-bomb')) {
          bombRange.player1++;
          targetCell.classList.remove('bigger-bomb')
        }
        
        
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
      const targetCell = table.rows[targetRow].cells[targetCol];
      
      if (
        !targetCell.querySelector('.bomb')&&
        targetRow >= 0 &&
        targetRow < table.rows.length &&
        targetCol >= 0 &&
        targetCol < table.rows[targetRow].cells.length &&
        targetCell.classList != 'breakable-block' &&
        targetCell.classList != 'wall' 
      ) {
        playerMoving2 = true;
        if (targetCell.classList == 'speed') {
          player2startspeed++
          targetCell.classList.remove('speed')
        }
        if (player2startspeed==0){
          playerspeed2(speed1());
        }else if (player2startspeed==1){
          playerspeed2(speed2());
        }else if (player2startspeed==2){
          playerspeed2(speed3());
        }else if (player2startspeed==3){
          playerspeed2(speed4());
        }
        ///////////more boms powerup
        if (targetCell.classList == 'more-bomb') {
          bombPlanted.player2++
          targetCell.classList.remove('more-bomb')
        }
        /////////////
         /////////////bigger bomb powerup
         if (targetCell.classList.contains('bigger-bomb')) {
          bombRange.player2++;
          targetCell.classList.remove('bigger-bomb')
        }
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
      const targetCell = table.rows[targetRow].cells[targetCol];
      if (
        !targetCell.querySelector('.bomb')&&
        targetRow >= 0 &&
        targetRow < table.rows.length &&
        targetCol >= 0 &&
        targetCol < table.rows[targetRow].cells.length &&
        targetCell.classList != 'breakable-block' &&
        targetCell.classList != 'wall' 
      ) {
        playerMoving3 = true;
        if (targetCell.classList == 'speed') {
          player3startspeed++
          targetCell.classList.remove('speed')
        }
        if (player3startspeed==0){
          playerspeed3(speed1());
        }else if (player3startspeed==1){
          playerspeed3(speed2());
        }else if (player3startspeed==2){
          playerspeed3(speed3());
        }else if (player3startspeed==3){
          playerspeed3(speed4());
        }
        ///////////more boms powerup
        if (targetCell.classList == 'more-bomb') {
          bombPlanted.player3++
          targetCell.classList.remove('more-bomb')
        }
        /////////////
         /////////////bigger bomb powerup
         if (targetCell.classList.contains('bigger-bomb')) {
          bombRange.player3++;
          targetCell.classList.remove('bigger-bomb')
        }
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
      const targetCell = table.rows[targetRow].cells[targetCol];
      if (
        !targetCell.querySelector('.bomb')&&
        targetRow >= 0 &&
        targetRow < table.rows.length &&
        targetCol >= 0 &&
        targetCol < table.rows[targetRow].cells.length &&
        targetCell.classList != 'breakable-block' &&
        targetCell.classList != 'wall' 
      ) {
        playerMoving4 = true;
        if (targetCell.classList == 'speed') {
          player4startspeed++
          targetCell.classList.remove('speed')
        }
        if (player4startspeed==0){
          playerspeed4(speed1());
        }else if (player4startspeed==1){
          playerspeed4(speed2());
        }else if (player4startspeed==2){
          playerspeed4(speed3());
        }else if (player4startspeed==3){
          playerspeed4(speed4());
        }
        ///////////more boms powerup
        if (targetCell.classList == 'more-bomb') {
          bombPlanted.player4++
          targetCell.classList.remove('more-bomb')
        }
        /////////////
         /////////////bigger bomb powerup
         if (targetCell.classList.contains('bigger-bomb')) {
          bombRange.player4++;
          targetCell.classList.remove('bigger-bomb')
        }
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