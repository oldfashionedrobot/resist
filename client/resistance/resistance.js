'use strict';

// how do i module import
import '/socket.io/socket.io.js';
import adapter from 'webrtc-adapter';

(function () {
  const socket = io();

  const createForm = document.querySelector('#create-game-form');

  let session = {};

  init();

  // init
  function init() {
    createForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(e.target);

      createGame(data.get('name')).then(
        (name) => {
          session.name = name;
          setupLobby();
        },
        () => {
          console.error('effed');
        }
      );
    });
  }

  function setupLobby() {
    createForm.remove();

    const lobbyTemplate = document.querySelector('template#lobby');
    document
      .querySelector('body')
      .append(lobbyTemplate.content.cloneNode(true));

    const lobbyTitle = document.querySelector('#lobby-title');
    lobbyTitle.innerText = session.name;
  }

  function createGame(roomName) {
    return new Promise((resolve, reject) => {
      socket.emit('create-room', roomName);

      socket.once('create-room-callback', (result) => {
        if (result.status === 'SUCCESS') {
          resolve(result.room);
        } else {
          reject();
        }
      });
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
