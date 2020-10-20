import React from 'react';
import socket from '../socket';

const NewMessage = ({setInput, input, handleSubmitForm, username, roomId, dispatch}) => {
  
  const handleChange = (e) => {    
    setInput(e.target.value);
    
    const data = {roomId, username, typing: true};
    socket.emit('ROOM:TYPING', data);

    if(!e.target.value){      
      socket.emit('ROOM:TYPING', {roomId, username: null, typing: true});
    }
  };

  React.useEffect(()=>{     
    socket.on('ROOM:TYPING', (data)=>{
      dispatch({
        type: 'SET_TYPING',
        payload: data.username,
      })
    });
    
  }, []);

  return (
    <form onSubmit={handleSubmitForm}>
      <textarea 
      rows="3 "
      value={input}
      onChange={handleChange}
      placeholder="text here"/>
      <button type="submit">SEND</button>
    </form>
  );
};

export default NewMessage;
