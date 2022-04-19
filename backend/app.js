const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('./libs/mongoose');
const verify = require('./middlewares/auth.mdw');
const { addNewMessage } = require('./services/messages');
const { getByID } = require('./services/conversations');
const socketIO = require('./libs/socket');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);
mongoose.connectDB(process.env.MONGODB_SRV);
const io = socketIO.initSocket(server);
// middleware using jwt
socketIO.useMiddleware(io);

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', verify, require('./routes/messages'));
app.use('/api/conversation', verify, require('./routes/conversation'));

// route default
app.use((req, res) => {
  res.status(404).send('NOT FOUND');
});

// connection socket io
io.on('connection', (socket) => {
  const { _id } = socket.user;
  socket.join(_id.toString());

  // handle user connected
  let usersOnline = [];
  for (let [id, socket] of io.of('/').sockets) {
    usersOnline.push({
      socketID: id,
      user: socket.user,
    });
  }

  // send all users connected to client
  socket.emit('usersOnline', usersOnline);

  // handle private message
  socket.on('private message', async ({ sender, conversationID, message }) => {
    let conversationDetail = await getByID(conversationID, 1, 0);
    let participants = conversationDetail?.conversation?.participants || [];
    for (let user of participants) {
      if (sender !== user._id.toString())
        io.to(user._id.toString()).emit('private message', {
          sender,
          conversationID,
          message,
        });
    }
    addNewMessage(sender, conversationID, message);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnect');
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
