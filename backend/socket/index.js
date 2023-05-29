const connectServerIO = (io) => {
  let users = [];
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) && users.push({ userId, socketId });
  };

  // remove user from users
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  //get user
  const getUser = (receiverId) => {
    return users.find((user) => user.userId === receiverId);
  };

  io.on('connection', (socket) => {
    // When connect
    console.log(`a user is connected: ${socket.id}`);
    // take userId and socketId from user
    socket.on('addUser', (userId) => {
      addUser(userId, socket.id);
      io.emit('getUsers', users);
    });

    // Send and get message
    const messages = {}; // Object to track messages sent to each user

    socket.on('sendMessage', (data) => {
      const message = {
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
        images: data.images,
        conversationId: data.conversationId,
        seen: false,
      };

      const user = getUser(data.receiverId);

      // Store the messages in the messages object
      if (!messages[data.receiverId]) {
        messages[data.receiverId] = [data.message];
      } else {
        messages[data.receiverId].push(data.message);
      }

      // Send message to receiver
      io.to(user?.socketId).emit('getMessage', message);
    });

    socket.on('messageSeen', ({ senderId, receiverId, messageId }) => {
      const user = getUser(senderId);
      //update seen flag for the message
      if (messages[senderId]) {
        const message = messages[senderId].find(
          (message) => message.receiverId === receiverId && message._id === messageId
        );
        if (message) {
          message.seen = true;
          // send a message seen event to the sender
          io.to(user?.socketId).emit('messageSeen', { senderId, receiverId, messageId });
        }
      }
    });

    // update and get last message
    socket.on('updateLastMessage', ({ lastMessage, lastMessageId }) => {
      io.emit('getLastMessage', {
        lastMessage,
        lastMessageId,
      });
    });

    // When disconnect
    socket.on('disconnect', () => {
      console.log(`a user disconnected`);
      removeUser(socket.id);
      io.emit('getUsers', users);
    });
  });
};

module.exports = connectServerIO;
