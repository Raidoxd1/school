
const map = [
    '###################',
    '#P.CC         CC.P#',
    '#.# # # # # # # #.#',
    '#C               C#',
    '#C# # # # # # # #C#',
    '#                 #',
    '# # # # # # # # # #',
    '#                 #',
    '# # # # # # # # # #',
    '#                 #',
    '# # # # # # # # # #',
    '#                 #',
    '# # # # # # # # # #',
    '#                 #',
    '#C# # # # # # # #C#',
    '#C               C#',
    '#.# # # # # # # #.#',
    '#P.CC         CC.P#',
    '###################'
];

function createMap() {
    table.innerHTML = '';
    for (let row = 0; row < map.length; row++) {
        const tr = document.createElement('tr');

        for (let col = 0; col < map[row].length; col++) {
            const td = document.createElement('td');

            switch (map[row][col]) {
                case '#': // Wall
                    td.classList.add('wall');
                    break;
                case 'P': // Player starting position
                    if (playerSocket === 'player1' && col === 1 && row === 1) {
                        td.classList.add('player1');
                    } else if (playerSocket === 'player2' && col === 17 && row === 17) {
                        td.classList.add('player2');
                    } else if (playerSocket === 'player3' && col === 17 && row === 1) {
                        td.classList.add('player3');
                    } else if (playerSocket === 'player4' && col === 1 && row === 17) {
                        td.classList.add('player4');
                    }
                    break;
                case 'C': // Breakable block
                    td.classList.add('breakable-block');
                    break;

            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}

function addBreakableBlocks() {
    const emptyCells = [];

    // Find empty cells in the map

    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] == 'B' || map[row][col] == 'S' || map[row][col] == 'M' || map[row][col] == 'O') {
                map[row] = map[row].substring(0, col) + ' ' + map[row].substring(col + 1);;
            }
        }
    }
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === ',') {
                map[row] = map[row].substring(0, col) + ' ' + map[row].substring(col + 1);;
            }
        }
    }
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === ' ') {
                emptyCells.push({ row, col });
            }
        }
    }

    // Shuffle the empty cells array randomly
    for (let i = emptyCells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [emptyCells[i], emptyCells[j]] = [emptyCells[j], emptyCells[i]];
    }

    // Add breakable blocks to random empty cells
    const numBlocks = Math.min(emptyCells.length, 100); // Maximum number of blocks to add
    for (let i = 0; i < numBlocks; i++) {
        const { row, col } = emptyCells[i];
        const chance1 = Math.random();
        const chance = Math.random();
        if (chance1 < 0.3) {

              if (chance < 0.33) {
            map[row] = map[row].substring(0, col) + 'S' + map[row].substring(col + 1);
            } else if (chance < 0.66) {
                map[row] = map[row].substring(0, col) + 'M' + map[row].substring(col + 1);
            } else {
                map[row] = map[row].substring(0, col) + 'O' + map[row].substring(col + 1);
             }

        } else {
            map[row] = map[row].substring(0, col) + 'B' + map[row].substring(col + 1);
        }
    }
    for (const { row, col } of emptyCells.slice(numBlocks)) {
        map[row] = map[row].substring(0, col) + ',' + map[row].substring(col + 1);

    }

    ws.send(JSON.stringify({
        type: 'map',
        map: map
    }));

}


// Example usage:

const createMapButton = document.getElementById('create-map-button');
createMapButton.addEventListener('click', addBreakableBlocks);



function updateMap(map) {
    table.innerHTML = '';

    for (let row = 0; row < map.length; row++) {
        const tr = document.createElement('tr');

        for (let col = 0; col < map[row].length; col++) {
            const td = document.createElement('td');

            switch (map[row][col]) {

                case '#': // Wall
                    td.classList.add('wall');
                    break;
                case 'C': // Breakable block
                    td.classList.add('breakable-block');
                    break;
                case 'B': // Breakable block
                   
                    td.classList.add('breakable-block');
                    break;
                case 'S': // Breakable block  
                    td.classList.add('breakable-block', 'speed');
                    break;
                case 'M': // Breakable block
                    td.classList.add('breakable-block', 'more-bomb');
                    break;
                case 'O': // Breakable block
                    td.classList.add('breakable-block', 'bigger-bomb');
                   
                    break;

            }

            tr.appendChild(td);
        }

        table.appendChild(tr);
    }
}


