import { io } from 'socket.io-client';
const socket = io('https://drab-ruby-buffalo-toga.cyclic.app/');

const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

const displayMessage = (message) => {
  const div = document.createElement('div');
  div.textContent = message;
  document.getElementById('message-container').append(div);
} 

socket.on('connect', () => {
  displayMessage(`You connected with id: ${socket.id}`)
})

socket.on('receive-message', (message) => {
  displayMessage(message);
})

form.addEventListener("submit", e => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;
  
  if (message === "") return;
  displayMessage(message);
  socket.emit('send-message', message, room);
  messageInput.value = "";
})


joinRoomButton.addEventListener('click', () => {
  const room = roomInput.value;
  socket.emit('join-room', room, () => {
    roomInput.style.fontWeight = 'bold';
    displayMessage(`Joined Room ${room}`)
  })
})
