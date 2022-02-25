const debug = require("debug")("backend:server");
const Player = require("../classes/Player");
const Room = require("../classes/Room");

const rooms = [];

function createRoom(socket, data) {
  const { nickname, id } = data;

  const host = new Player(nickname);
  const room = new Room(id, host);

  socket.data.player = host;
  socket.data.room = room;

  socket.join(id);
  rooms.push(room);

  debug(`Host "${host.nickname}" joined room "${id}"`);
}

function joinRoom(io, socket, data) {
  const { nickname, id } = data;

  const roomExists = rooms.find((room) => {
    if (room.id === id) {
      socket.data.room = room;
      return room.id === id;
    }
  });

  if (roomExists) {
    const room = socket.data.room;
    const player = new Player(nickname);

    // Check if nickname is taken already
    if (
      room.players.find((player) => {
        return player.nickname.toLowerCase() === nickname.toLowerCase();
      })
    ) {
      socket.emit("nameTaken", { name: nickname });
      debug(`Nickname ${nickname} is already taken.`);
      return;
    }

    socket.join(id);
    room.addPlayer(player);

    socket.data.player = player;
    socket.data.room = room;

    io.to(id).emit("roomConnection", room.players.length);

    debug(`User "${player.nickname}" joined room "${id}"`);
    debug(`'${room.players.length}' players in "${id}"`);
  } else {
    socket.emit("roomNotFound");
  }
}

function roomExists(socket, data) {
  const { id } = data;

  if (
    rooms.find((room) => {
      return room.id === id;
    })
  ) {
    socket.emit("roomFound");
  } else {
    socket.emit("roomNotFound");
  }
}

function userDisconnect(io, socket) {
  const { player, room } = socket.data;
  const roomId = [...socket.rooms.values()][1];

  if (!player) return;
  if (!roomId) return;

  const nickname = player.nickname.slice();

  const i = rooms.findIndex((room) => {
    return room.id === roomId;
  });

  /*
   * This stops a crash when userDisconnect is called
   * before createRoom is finished.
   *
   * The performance of this algorithm is bad, but this is
   * a very rare and specific case.
   */
  if (i === -1) {
    const thePlayersRooms = rooms.filter((room) => {
      return room.players.find((aPlayer) => {
        return aPlayer.nickname === nickname;
      });
    });

    thePlayersRooms.forEach((room) => {
      const index = rooms.findIndex((aRoom) => {
        return aRoom.id === room.id;
      });
      rooms.splice(index, 1);
      debug(`Destroyed zombie room '${room.id}'...`);
    });

    debug(`Destroyed all of '${nickname}'s' rooms, stopping a crash.`);
    socket.data = {};
    return;
  }

  if (nickname) {
    // Remove player from local rooms storage.
    const playerIndex = rooms[i].players.findIndex((player) => {
      return player.nickname === nickname;
    });

    rooms[i].players.splice(playerIndex, 1);

    io.to(roomId).emit("roomConnection", rooms[i].players.length);

    debug(`User "${nickname}" disconnected from "${room.id}"`);
  }

  if (io.sockets.adapter.rooms.get(roomId).size === 1) {
    rooms.splice(i, 1);
    debug(`Room "${roomId}" was destroyed.`);
  }

  socket.data = {};
}

module.exports = { createRoom, joinRoom, roomExists, userDisconnect };
