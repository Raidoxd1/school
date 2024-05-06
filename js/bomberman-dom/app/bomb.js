
let bombPlanted = {
  player1: 2,
  player2: 1,
  player3: 1,
  player4: 1
};

let bombRange = {
  player1: 2,
  player2: 1,
  player3: 1,
  player4: 1
};



document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    if (username === 'player1' && bombPlanted.player1!= 0) {
      bombPlanted.player1--;
      plantBomb(playerRow1, playerCol1,username, bombRange.player1);
    } else  if (username === 'player2' && bombPlanted.player2!= 0) {
      bombPlanted.player2--;
      plantBomb(playerRow2, playerCol2,username, bombRange.player2);
    } else  if (username === 'player3' && bombPlanted.player3!= 0) {
      bombPlanted.player3--;
      plantBomb(playerRow3, playerCol3,username, bombRange.player3);
    } else  if (username === 'player4' && bombPlanted.player4!= 0) {
      bombPlanted.player4--;
      plantBomb(playerRow4, playerCol4,username, bombRange.player4);
    }
  }
});

function removeBomb(targetCell, row, col) {
  const bomb = targetCell.querySelector('.bomb');
  if (bomb) {
    bomb.remove();
    ws.send(
      JSON.stringify({
        type: 'bombExplosion',
        position: { row, col },
        username
      })
    );
  }
}

function removeExplosion(explosionCells) {
  explosionCells.forEach(([expRow, expCol]) => {
    if (
      expRow >= 0 &&
      expRow < table.rows.length &&
      expCol >= 0 &&
      expCol < table.rows[expRow].cells.length
    ) {
      const expCell = table.rows[expRow].cells[expCol];
      expCell.classList.remove('explosion');
    }
  });
}

function triggerExplosion(explosionCells) {
  explosionCells.forEach(([expRow, expCol]) => {
    if (
      expRow >= 0 &&
      expRow < table.rows.length &&
      expCol >= 0 &&
      expCol < table.rows[expRow].cells.length
    ) {
      const expCell = table.rows[expRow].cells[expCol];
      expCell.classList.add('explosion');
      if (expCell.classList.contains('breakable-block')) {
        expCell.classList.remove('breakable-block');
        map[expRow][expCol] = ' ';
      }
    }
  });

  setTimeout(() => {
    removeExplosion(explosionCells);
  }, 1000);
}


function plantBomb(row, col,username, range) {
  const targetCell = table.rows[row].cells[col];

  // Check if the target cell already has a bomb
  if (targetCell.querySelector('.bomb')) {
    return; // If a bomb exists, exit the function without planting a new bomb
  }

  

  const bomb = document.createElement('div');
  bomb.classList.add('bomb');
  targetCell.appendChild(bomb);

  const explosionCells = [
    ...generateExplosionCells(row , col, 'up', range), // Up
    ...generateExplosionCells(row , col, 'down', range), // Down
    ...generateExplosionCells(row, col , 'left', range), // Left
    ...generateExplosionCells(row, col , 'right', range), // Right
    [row, col]
  ];

  
  

  // Set a timeout to remove the bomb after a certain duration
  setTimeout(() => {
    removeBomb(targetCell, row, col);
    bombPlanted[username]++;
    ws.send(
      JSON.stringify({
        type: 'bombExplosion',
        position: { row, col },
        username
      })
    );

    
    triggerExplosion(explosionCells);
  }, 3000);

  // Broadcast the bomb placement to other players
  ws.send(
    JSON.stringify({
      type: 'plantBomb',
      position: { row, col },
      username
    })
  );
}

function generateExplosionCells(startRow, startCol, direction, range) {
  const cells = [];
  let currentRow = startRow;
  let currentCol = startCol;
  console.log(range)
  for (let i = 0; i < range; i++) {
    if (direction === 'up') {
      currentRow--;
    } else if (direction === 'down') {
      currentRow++;
    } else if (direction === 'left') {
      currentCol--;
    } else if (direction === 'right') {
      currentCol++;
    }

    if (
      currentRow >= 0 &&
      currentRow < table.rows.length &&
      currentCol >= 0 &&
      currentCol < table.rows[currentRow].cells.length &&
      map[currentRow][currentCol] !== '#'
    ) {
      cells.push([currentRow, currentCol]);
    } else {
      break; // Stop generating cells if we encounter a wall or boundary
    }
  }

  return cells;
}


function handlePlantBomb(message) {
  const { position, username } = message;
  const { row, col } = position;

  // Add code to visually display the bomb at the given position for the specified username
  const targetCell = table.rows[row].cells[col];
  const bomb = document.createElement('div');
  bomb.classList.add('bomb');
  targetCell.appendChild(bomb);

}

function handleBombExplosion(message) {
  const { position,username } = message;
  const { row, col } = position;

  // Remove the bomb
  const targetCell = table.rows[row].cells[col];
  removeBomb(targetCell, row, col);

  // Display the explosion in a cross shape
  const explosionCells = [
    ...generateExplosionCells(row , col, 'up', bombRange[username]), // Up
    ...generateExplosionCells(row , col, 'down', bombRange[username]), // Down
    ...generateExplosionCells(row, col , 'left', bombRange[username]), // Left
    ...generateExplosionCells(row, col , 'right', bombRange[username]), // Right
    [row, col]
  ];
  

  triggerExplosion(explosionCells);
  
  
}
