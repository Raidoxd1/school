const http = require('http');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const extname = path.extname(filePath);
  let contentType = 'text/html';

  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        res.end('404 - File Not Found');
      } else {
        // Server error
        res.writeHead(500);
        res.end('500 - Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const wss = new WebSocket.Server({ noServer: true });
const clients = new Set();
let player1Socket = null;
let player2Socket = null;
let player3Socket = null;
let player4Socket = null;

wss.on('connection', (ws) => {
  clients.add(ws);

  if (!player1Socket) {
    player1Socket = ws;
    ws.send(JSON.stringify({ type: 'username', value: 'player1' }));
    ws.send(
      JSON.stringify({
        type: 'initialPosition',
        position: { row: 1, col: 1 }, // Player 1 initial position (top left)
        username: 'player1' // Pass the username as 'player1'
      })
    );
  } else if (!player2Socket) {
    player2Socket = ws;
    ws.send(JSON.stringify({ type: 'username', value: 'player2' }));
    ws.send(
      JSON.stringify({
        type: 'initialPosition',
        position: { row: 17, col: 17 }, // Player 2 initial position (bottom right)
        username: 'player2' // Pass the username as 'player2'
      })
    );
  } else if (!player3Socket) {
    player3Socket = ws;
    ws.send(JSON.stringify({ type: 'username', value: 'player3' }));
    ws.send(
      JSON.stringify({
        type: 'initialPosition',
        position: { row: 1, col: 17 }, // Player 3 initial position (top right)
        username: 'player3' // Pass the username as 'player3'
      })
    );
  } else if (!player4Socket) {
    player4Socket = ws;
    ws.send(JSON.stringify({ type: 'username', value: 'player4' }));
    ws.send(
      JSON.stringify({
        type: 'initialPosition',
        position: { row: 17, col: 1 }, // Player 4 initial position (bottom left)
        username: 'player4' // Pass the username as 'player4'
      })
    );
  }

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.type === 'updatePlayer') {
      broadcastUpdatePlayer(ws, data.position, data.username); // Pass the 'username' from the client message
    }
    if (data.type === 'plantBomb') {
      broadcastPlantBomb(ws, data.position, data.username); // Pass the 'username' and 'position' from the client message
    }
    if (data.type === 'bombExplosion') {
      broadcastBombExplosion(ws, data.position, data.username); // Pass the 'username' and 'position' from the client message
    }
    if (data.type === 'map') {
      broadcastMap(data.map) // Pass the 'username' and 'position' from the client message
    }

    
  });

  ws.on('close', () => {
    clients.delete(ws);
  
    if (ws === player1Socket) {
      player1Socket = null;
      broadcastRemoveBomb(ws, 'player1'); // Pass the 'username' of the disconnected player
    } else if (ws === player2Socket) {
      player2Socket = null;
      broadcastRemoveBomb(ws, 'player2'); // Pass the 'username' of the disconnected player
    } else if (ws === player3Socket) {
      player3Socket = null;
      broadcastRemoveBomb(ws, 'player3'); // Pass the 'username' of the disconnected player
    } else if (ws === player4Socket) {
      player4Socket = null;
      broadcastRemoveBomb(ws, 'player4'); // Pass the 'username' of the disconnected player
    }
  });

  function broadcastMap(map) {
    const data = JSON.stringify({ type: 'map', map });
  
    clients.forEach((client) => {
     
        client.send(data);
      
    });
  }
  
  function broadcastRemoveBomb(sender, username) {
    const data = JSON.stringify({ type: 'removeBomb', username });
  
    clients.forEach((client) => {
      if (client !== sender) {
        client.send(data);
      }
    });
  }
  function broadcastBombExplosion(sender, position, username) {
    const data = JSON.stringify({ type: 'bombExplosion', position, username });
  
    clients.forEach((client) => {
      if (client !== sender) {
        client.send(data);
      }
    });
  }
  
  

  // Send the player socket information to the client
  if (player1Socket === ws) {
    ws.send(JSON.stringify({ type: 'playerSocket', value: 'player1Socket' }));
  } else if (player2Socket === ws) {
    ws.send(JSON.stringify({ type: 'playerSocket', value: 'player2Socket' }));
  } else if (player3Socket === ws) {
    ws.send(JSON.stringify({ type: 'playerSocket', value: 'player3Socket' }));
  } else if (player4Socket === ws) {
    ws.send(JSON.stringify({ type: 'playerSocket', value: 'player4Socket' }));
  }
});

function broadcastUpdatePlayer(sender, position, username) {
  const data = JSON.stringify({ type: 'updatePlayer', position, username });

  clients.forEach((client) => {
    if (client !== sender) {
      client.send(data);
    }
  });
}

function broadcastPlantBomb(sender, position, username) {
  const data = JSON.stringify({ type: 'plantBomb', position, username });

  clients.forEach((client) => {
    if (client !== sender) {
      client.send(data);
    }
  });
}


server.on('upgrade', (req, socket, head) => {
  if (req.headers.upgrade === 'websocket') {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  }
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
