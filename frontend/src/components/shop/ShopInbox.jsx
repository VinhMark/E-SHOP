import API from 'api';
import { useEffect, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { TfiGallery } from 'react-icons/tfi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import socketIO from 'socket.io-client';
import { backend_url } from 'api/server';
import styles from 'styles/style';

const ENDPOINT = 'http://localhost:4000';
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] });

const ShopInbox = () => {
  const { seller } = useSelector((state) => state.shop);
  const [conversations, setConversations] = useState([]);
  const [active, setActive] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (seller) {
      const userId = seller._id;
      socketId.emit('addUser', userId);
      socketId.on('getUsers', (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  useEffect(() => {
    socketId.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        receiver: data.receiverId,
        message: data.message,
        images: data.images,
        conversationId: data.conversationId,
      });

      setConversations(
        conversations.map((item) => {
          if (item._id === data.conversationId) {
            return { ...item, lastMessage: data.message, lastMessageId: data.sender };
          }
          return item;
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // get info user and product message of conversation
  useEffect(() => {
    if (currentChat) {
      API.get('/message/get-message-conversation/' + currentChat._id).then((res) => setMessages(res.data.messages));
    }
  }, [currentChat, seller]);

  useEffect(() => {
    if (arrivalMessage) {
      currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    API.get('/conversation/get-all-conversation-seller/' + seller._id, { withCredentials: true }).then((res) => {
      const conversations = res.data.conversations;
      setConversations(conversations);
      setActive(conversations.length > 0 ? conversations[0]._id : null);
    });
  }, [seller]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    const receiverId = currentChat.members.find((member) => member !== seller._id);
    socketId.emit('sendMessage', {
      senderId: seller._id,
      receiverId,
      message: newMessage,
      conversationId: currentChat._id,
    });
    // Insert message to db
    const message = {
      sender: seller._id,
      message: newMessage,
      conversationId: currentChat._id,
    };
    API.post('/message/create-message', message, { withCredentials: true })
      .then((res) => {
        setMessages([...messages, res.data.message]);
        updateLastMessage(res.data.message.message, res.data.message.sender);
      })
      .catch((error) => console.log(error));
  };

  const updateLastMessage = (message, sender) => {
    socketId.emit('updateLastMessage', {
      lastMessage: message,
      lastMessageId: sender,
    });

    API.put('/conversation/update-last-message/' + currentChat._id, {
      lastMessage: message,
      lastMessageId: sender,
    }).then((res) => {
      setNewMessage('');
    });
  };

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller._id);
    const online = onlineUsers.findIndex((user) => user.userId === chatMembers);
    return online >= 0;
  };

  return (
    <div className='w-full bg-white'>
      {open ? (
        <Inbox
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          messages={messages}
          handleSendMessage={handleSendMessage}
          setMessages={setMessages}
          sellerId={seller._id}
          setCurrentChat={setCurrentChat}
          currentChat={currentChat}
          online={onlineCheck(currentChat)}
        />
      ) : (
        <>
          <h1 className='text-center text-[30px] py-3 font-Poppins'>All Messages</h1>
          {/* All messages list */}
          {conversations.map((item) => (
            <MessageList
              conversation={item}
              key={item._id}
              active={active}
              setActive={setActive}
              setOpen={setOpen}
              setCurrentChat={setCurrentChat}
              seller={seller}
              online={onlineCheck(item)}
            />
          ))}
        </>
      )}
    </div>
  );
};

const MessageList = ({ conversation, active, setActive, setOpen, setCurrentChat, seller, online }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('?' + conversation._id);
    setOpen(true);
    setCurrentChat(conversation);
  };

  return (
    <div
      className={`w-full flex flex-wrap px-3 py-2 ${
        active === conversation._id ? 'bg-[#00000010]' : 'bg-transparent'
      }  cursor-pointer gap-2`}
      onClick={() => setActive(conversation._id) || handleClick()}
    >
      <div className='flex '>
        <div
          className={`relative w-[50px] h-[50px] rounded-full bg-cover border-[2px] border-green-200 bg-white flex-shrink-0`}
        >
          <img src={`${backend_url}/${conversation.user.avatar}`} alt='' />
          <span
            className={`absolute w-[12px] h-[12px] rounded-full ${
              online ? 'bg-green-400' : 'bg-gray-500'
            } bottom-0 right-[3px]`}
          ></span>
        </div>
        <div className='pl-3 flex-shrink'>
          <h1 className='text-[18px] font-[500]'>{conversation.user.name}</h1>
          <p className='text-[16px] text-[#000c] line-clamp-2'>
            {seller._id === conversation.lastMessageId ? 'You' : conversation.user.name}: {conversation.lastMessage}
          </p>
        </div>
      </div>

      {/* Product */}
      {conversation.product ? (
        <div className='flex items-center bg-gray-300 px-3 rounded mx-3'>
          <img
            src={`${backend_url}/${conversation.product.images[0]}`}
            alt=''
            className='w-[50px] h-[50px] rounded-full object-cover'
          />
          <span className='text-[16px] font-[600] text-[#000000ab]'>{conversation.product.name}</span>
        </div>
      ) : (
        <span>Product is not found</span>
      )}

      {/* time */}
      <div className='whitespace-nowrap text-end justify-end grow'>
        <h1 className='text-[14px] text-[#000000ab]'>{new Date(conversation.updatedAt).toLocaleString()}</h1>
      </div>
    </div>
  );
};

const Inbox = ({
  messages,
  setMessages,
  setOpen,
  newMessage,
  setNewMessage,
  handleSendMessage,
  sellerId,
  setCurrentChat,
  currentChat,
  online,
}) => {
  useEffect(() => {
    return () => setMessages([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='h-full flex flex-col justify-between'>
      {/* Message header */}
      <div className='flex p-3 items-center justify-between bg-slate-200'>
        <div className='flex'>
          <img
            src={`${backend_url}/${currentChat.user.avatar}`}
            alt=''
            className='w-[60px] h-[60px] object-cover rounded-full'
          />

          <div className='pl-3'>
            <h1 className='text-[18px] font-[600]'>{currentChat.user.name}</h1>
            <h1 className={`${online ? 'text-green-400' : ''}`}>{online ? 'Active' : 'Off'}</h1>
          </div>
        </div>

        <AiOutlineArrowRight
          size={20}
          onClick={() => setOpen(false) || setCurrentChat(null)}
          className='cursor-pointer'
        />
      </div>

      {/* Product */}
      {currentChat.product ? (
        <div className='flex items-center justify-center bg-gray-300 gap-5'>
          <img
            src={`${backend_url}/${currentChat.product.images[0]}`}
            alt=''
            className='w-[100px] h-[100px] object-cover'
          />
          <div className=''>
            <h1 className={`${styles.productTitle}`}>{currentChat.product.name}</h1>
            <div className='flex'>
              <h4 className={styles.productDiscountPrice}>${currentChat.product.discountPrice}</h4>
              <h3 className={styles.price}>
                {currentChat.product.originalPrice ? currentChat.product.originalPrice + '$' : null}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <span>Product is not found</span>
      )}

      {/* messages */}
      <div className='h-[61vh] overflow-y-auto p-5'>
        {messages.map((item) => {
          return (
            <div
              className={`flex gap-2 my-2 ${item.sender === sellerId ? 'justify-end self-r' : 'justify-start'}`}
              key={item._id}
            >
              {item.sender !== sellerId && (
                <img
                  src={`${backend_url}/${currentChat.user.avatar}`}
                  className='w-[40px] h-[40px] rounded-full object-cover border'
                  alt=''
                />
              )}
              <div className='flex flex-col'>
                <p
                  className={`w-max py-2 px-4 rounded ${
                    item.sender === sellerId ? 'bg-[#38c776] self-end' : 'bg-gray-500'
                  }  text-white h-min`}
                >
                  {item.message}
                </p>
                <p className={`${item.sender === sellerId ? 'text-left' : 'text-right'} text-[12px] text-[#000000b3]`}>
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Send message input */}
      <form className='p-3 flex items-center' onSubmit={handleSendMessage}>
        <div className='w-[5%] flex justify-center'>
          <TfiGallery size={20} className='cursor-pointer' />
        </div>
        <div className='relative w-full'>
          <input
            type='search'
            id='search-dropdown'
            className='block p-2.5 w-full z-20 text-sm bg-gray-50 rounded-lg border-l-gray-100 border-l-2 border border-gray-300'
            placeholder='Enter your message...'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
          />
          <button
            type='submit'
            className='absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 '
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ShopInbox;
