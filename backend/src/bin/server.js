#!/usr/bin/env node

/*
 * Module dependencies.
 */
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
var app = require("../app");
var debug = require("debug")("backend:server");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { storeCardsInCache } = require("../cache/memoryCache");

/*
 * Import the event handler
 */
const eventHandler = require("../events/handler");

/*
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

/*
 * Read card data and store in cache.
 */
storeCardsInCache();

/*
 * Create HTTP and WebSocket server.
 */

var httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5005",
  },
});

/*
 * Listen on provided port, on all network interfaces.
 */
httpServer.listen(port);
httpServer.on("error", onError);
httpServer.on("listening", onListening);

/*
 * WebSocket listener
 */

io.on("connection", async (socket) => {
  eventHandler(io, socket);
});

/*
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/*
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/*
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = httpServer.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
