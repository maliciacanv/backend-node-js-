const express = require('express');
const app = express();
const server = require('http').Server(app);
const config = require('./config')
const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('./socket');
// const router = require('./components/message/network');
const db = require('./db')
const routes = require('./network/routes');

db(config.dbUrl)

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
socket.connect(server);
// app.use(router);
routes(app);

// app.use('/', function(rep, res) {
//     res.send('Hola')
// });

app.use('/app', express.static('public'));
server.listen(config.port, function() {
    console.log('la aplicacion esta escuchando en http/localhost:3000');
});