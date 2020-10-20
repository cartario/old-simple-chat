import React from 'react';


const Login = ({data, handlerSubmit, setValue}) => {
  const {roomId, username} = data;

  const handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValue({
      ...data, [name]: value
    });     
  };

  return (
    <form className="form" onSubmit={handlerSubmit}>
      <div className="inputBox">
        <input className="input roomId"
          name="roomId"
          id="roomId"
          type="text"
          placeholder="roomID"
          value={roomId}
          onChange={handlerChange}
          />
      </div>
      <div className="inputBox">
        <input className="input name"
          name="username"
          id="name"
          type="text"
          placeholder="name"
          value={username}
          onChange={handlerChange}
          />
      </div>       
      <button disabled={!username&!roomId} className="button" type="submit">ВОЙТИ</button>
    </form>  
  );
};

export default Login;
