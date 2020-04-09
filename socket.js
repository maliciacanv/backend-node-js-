// genera una instancia y compartirla 

const socketIO = require('socket.io');
const socket = {};


function connect(server) {
    socket.io = socketIO(server);
}

module.exports = {
    connect,
    socket,
}