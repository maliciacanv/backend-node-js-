const express = require('express');

const app = express();
const server = require('http').Server(app) //inicializando un servidor en node
const io = require('socket.io')(server);

app.use(express.static('public'))

io.on('connection', function(socket) {
    console.log('nuevo cliente conectado');
    socket.emit('mensaje', 'bienvenido')
})

setInterval(function() {
    io.emit('mensaje', 'hola os escribo a todos')
}, 3000);

server.listen(8080, function() {
    console.log('servidr inicializado websockets')
});