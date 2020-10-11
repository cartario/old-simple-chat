import React from 'react';
import axios from 'axios';
import socket from '../src/socket';

const reducer = (state, action) => {
  switch(action.type){
    case 'JOINED':
      return {...state, joined: true, roomId: action.payload.roomId, username: action.payload.username}
    default:
      return state;
  }
};

const initialState = {
  joined: false,
  roomId: null,
  username: null,
};

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [data, setValue] = React.useState({roomId: '', username: ''});
  const {roomId, username} = data;

  const onLogin = () => {
    dispatch({
      type: 'JOINED', 
      payload: data
    });

    socket.emit('ROOM:JOIN', data);
  };  
  
  const handlerSubmit = (e) => {    
    e.preventDefault();
    axios.post('/rooms', data).then(onLogin);
  };

  const handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValue({
      ...data, [name]: value
    });     
  };

  React.useEffect(()=>{
    socket.on('ROOM:JOINED', (users)=>{
      console.log(users);
    });
  }, []);
console.log(state)
  return (
    <div className="App">
      <div className="container">

        {!state.joined ? 
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
        :   

        <div className="authorized">
          <h1>Authorized</h1>
          <p>Room: {roomId}</p>
          <p>User: {username}</p>
        </div> 

        }

      </div>
    </div>
  );
}

export default App;
