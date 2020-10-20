import React from 'react';

const Messages = ({messages}) => {
  const refMessages = React.useRef();

  React.useEffect(()=>{
    refMessages.current.scrollTo(0, 99999)
  }, [messages])

  return (
    <div ref={refMessages} className="messages">
      {messages && messages.map((message)=>
      <div key={message.userName + message.text} className="message">
        <p className="text">{message.text}</p>
        <span>Username: {message.userName}</span>
        <p></p>
      </div>    
      )}    
    </div>
  );
};

export default Messages;
