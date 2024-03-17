const express = require('express');
const db = require('./db/dbconnection');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const Server = require("socket.io").Server;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  }
});

const memberroutes = require('./routes/memberroutes');
const organizationroutes = require('./routes/organizationroutes');
const projectroutes = require('./routes/project');
const messageroutes = require('./routes/messageroutes');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use(memberroutes);
app.use(organizationroutes);
app.use(projectroutes);
app.use(messageroutes);

// Socket.io event listeners
io.on('connection', (socket) => {
    socket.on('sendMessage', (message) => {
      console.log('Received message:', message);
      io.emit('newMessage', message); // Broadcast message to all clients
    });
  });
  

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
