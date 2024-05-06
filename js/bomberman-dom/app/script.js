


const table = document.getElementById('app');


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
    createMap()
  }else if (data.type === 'plantBomb') {
    handlePlantBomb(data);
  } else if (data.type === 'bombExplosion') {
    handleBombExplosion(data);
  }if (data.type === 'map') {
    const updatedMap = data.map;
    updateMap(updatedMap);
  }
});






