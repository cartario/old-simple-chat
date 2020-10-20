import React from 'react';

const NewMessage = ({setInput, input, handleSubmitForm}) => {
  
  const handleChange = (e) => {    
    setInput(e.target.value);
  }

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
