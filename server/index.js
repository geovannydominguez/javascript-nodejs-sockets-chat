// Cargar el modulo express
var express = require('express');

// Llamar a express
var app = express();

// Cargar el servidor http
var server = require('http').Server(app);

// Cargar la libreria socket.io y pasarle el server
var io = require('socket.io')(server);

const cors = require('cors');

// middleware
const corsOptions = {
    origin: 'http://localhost:6677',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(express.static('client'));

// una ruta
app.get('/hello-world', function (req, res) {
    res.status(200).send('hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: "Hola esto es una prueba desde el server",
    nickname: "Bot-Geovanny"
}];

// socket
io.on('connection', function (socket) {
    console.log("IP source: " + socket.handshake.address + " se ha conectado...");

    // enviar el mensaje
    socket.emit('messages', messages);

    // recoger el mensaje
    socket.on('add-message', function (data) {
        messages.push(data);

        io.sockets.emit('messages', messages);
     });

});

server.listen(6677, function () {
    console.log('El server esta funcionando en http://localhost:6677');
});