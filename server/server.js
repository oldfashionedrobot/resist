const express = require('express');
const compileSass = require('express-compile-sass');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const root = path.join(__dirname, '..');

// BEGIN SERVER
app.use(
  compileSass({
    root: root + '/client',
    sourceMap: true, // Includes Base64 encoded source maps in output css
    sourceComments: true, // Includes source comments in output css
    watchFiles: true, // Watches sass files and updates mtime on main files for each change
    logToConsole: false, // If true, will log to console.error on errors
  })
);

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(root + '/client/app.html');
});

app.get('/resistance', (req, res) => {
  res.sendFile(root + '/client/resistance/resistance.html');
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// END SERVER

const rooms = [];

// BEGIN SOCKET
io.on('connection', (socket) => {
  socket.on('create-room', (msg) => {
    console.log(msg, rooms);
    if (rooms.includes(msg)) {
      socket.emit('create-room-callback', {
        status: 'ERROR',
        message: `Room ${msg} already exists!`,
      });
    } else {
      rooms.push(msg);
      socket.emit('create-room-callback', {
        status: 'SUCCESS',
        message: `Room ${msg} successfully created!`,
        room: msg,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
//  END SOCKET
