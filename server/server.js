const express = require('express');
const compileSass = require('express-compile-sass');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const root = process.cwd();

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

// BEGIN SOCKET
io.on('connection', (socket) => {
  console.log('connected');

  socket.on('create-game', (msg) => {
    socket.emit('create-game-callback', true);
  });
});
//  END SOCKET
