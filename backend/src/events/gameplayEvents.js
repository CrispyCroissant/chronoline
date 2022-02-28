const debug = require("debug")("backend:server");

function resetGame(socket) {
  const { room } = socket.data;

  room.reset();

  socket.emit("gameIsReset", room);
  debug(`Game '${room.id} has been reset'`);
}

function startGame(io, socket) {
  let room = socket.data.room;

  // Start loading animation for all players
  io.to(room.id).emit("startLoadingGame");

  const playerAmount = room.players.length;
  if (playerAmount <= 5) {
    room.fillDeck(playerAmount * 8);
  } else {
    room.fillDeck(50);
  }

  // Fill the deck

  // Give each player 5 unique cards.
  room.handOutCards(5);

  // Place random card from deck on table and choose player turn.
  try {
    room.initTable();
  } catch (error) {
    room = null;
    return;
  }

  io.to(room.id).emit("initGame", room);
  debug("Room initialized");
}

function playCard(io, socket, data) {
  const { card, index } = data;
  const { room, player } = socket.data;

  room.insertCard(card, index);

  player.removeCard(card);

  // Update cards on table and player's new sheet
  io.to(room.id).emit("tableUpdate", { table: room.table });
  io.to(room.id).emit("playerUpdate", { players: room.players });

  room.checkPlayedCard(card, index, player);

  // Update player cards in case of any changes
  io.to(room.id).emit("playerUpdate", { players: room.players });

  room.startNextTurn();

  io.to(room.id).emit("tableUpdate", { table: room.table });

  const winner = room.hasWinner();
  if (winner) {
    io.to(room.id).emit("gameFinished", winner);
    return;
  }

  io.to(room.id).emit("nextTurn", { currentTurn: room.currentTurn });

  // Fetch more cards
  if (room.deck.length === 3) {
    room.fillDeck(10);
    debug(`Room '${room.id}' refilled its deck`);
  }
}

module.exports = { resetGame, startGame, playCard };
