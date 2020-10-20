import React from 'react';

const messages = [
  {
    text: 'text1',
    userName: 'user1'
  },
  {
    text: 'text2',
    userName: 'user2'
  },
  {
    text: 'text3',
    userName: 'user3'
  },
];

const Messages = () => {
  return (<>
    {messages.map((message)=>
    <div key={message.userName} className="message">
      <p className="text">{message.text}</p>
      <span>Username: {message.userName}</span>
      <p></p>
    </div>    
    )}    
    </>
  );
};

export default Messages;
