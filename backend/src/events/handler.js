const {
  createRoom,
  joinRoom,
  roomExists,
  userDisconnect,
} = require("./roomEvents");
const { resetGame, startGame, playCard } = require("./gameplayEvents");

module.exports = (io, socket) => {
  socket.on("createRoom", (data) => {
    createRoom(socket, data);
  });

  socket.on("resetGame", () => {
    resetGame(socket);
  });

  socket.on("joinRoom", (data) => {
    joinRoom(io, socket, data);
  });

  socket.on("roomExists", (data) => {
    roomExists(socket, data);
  });

  socket.on("startGame", () => {
    startGame(io, socket);
  });

  socket.on("playCard", (data) => {
    playCard(io, socket, data);
  });

  socket.on("leaveRoom", () => {
    userDisconnect(io, socket);
  });

  socket.on("disconnecting", () => {
    userDisconnect(io, socket);
  });
};
