const socket = io();

const roomInput = document.querySelector('#gameinput');

///test
roomInput.addEventListener('blur', (e) => {
  createGame(e.target.value);
});

function createGame(roomName) {
  socket.emit('create-game', roomName);

  socket.once('create-game-callback', (result) => {
    if (result === true) {
      console.log(`Created Game "${roomName}"`);
      // startGame(roomName);
    } else {
      console.log('whtatatat');
      // alert('Game "' + roomName + '" already exists');
    }
  });
}

// function joinGame() {
//   const roomName = roomInput.value;
//   socket.emit('join-room', roomName);

//   socket.once('room-join-result', (result) => {
//     if (result === true) {
//       // console.log(`Joined Game "${roomName}"`);
//       startGame(roomName);
//     } else {
//       alert('Game "' + roomName + '" not found');
//     }
//   });
// }
