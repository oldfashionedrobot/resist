'use strict';

import '/socket.io/socket.io.js';

(function () {
  // how do i module import

  const socket = io();

  function createGame() {
    const roomName = roomInput.value;
    socket.emit('create-room', roomName);

    socket.once('room-create-result', (result) => {
      if (result === true) {
        // console.log(`Created Game "${roomName}"`);
        startGame(roomName);
      } else {
        alert('Game "' + roomName + '" already exists');
      }
    });
  }

  function joinGame() {
    const roomName = roomInput.value;
    socket.emit('join-room', roomName);

    socket.once('room-join-result', (result) => {
      if (result === true) {
        // console.log(`Joined Game "${roomName}"`);
        startGame(roomName);
      } else {
        alert('Game "' + roomName + '" not found');
      }
    });
  }
})();
