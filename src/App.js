import React from 'react';
import axios from 'axios';
import socket from '../src/socket';
import Container from './sobes';
import Login from './components/login';
import Messages from './components/messages';
import NewMessage from './components/new-message';
import {reducer, initialState} from './reducer';

function App() {
  const [visible, setVisible] = React.useState(false);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [data, setValue] = React.useState({roomId: '', username: ''});  
  const [input, setInput] = React.useState('');
  const {roomId, username} = data; 

  const onLogin = () => {
    dispatch({
      type: 'JOINED', 
      payload: data
    });

    socket.emit('ROOM:JOIN', data);
  }; 

  const handleSubmitRoom = (e) => {    
    e.preventDefault();
    axios.post('/rooms', data).then(onLogin);
  };

  const setUsers = (users)=>{ 
    dispatch({
      type: 'SET_USERS',
      payload: users
    })
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = {
      roomId,
      text: input,
      userName: username
    };
    socket.emit('ROOM:NEW_MESSAGE', formData);
  }

  React.useEffect(()=>{
    socket.on('ROOM:JOINED', setUsers);    
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:SET_MESSAGE', (obj)=>{      
      console.log(obj)
    }); 
  }, []);

  const handleToggle = () => {
    setVisible(!visible)
  };

  return (
    <div className="App">
      <div className="container">

        {!state.joined ? 
        <Login
          data={data}
          handlerSubmit={handleSubmitRoom}
          setValue={setValue}/>       
        :   

        <div className="authorized">
          <h1>Authorized</h1>
          <p>Room: {roomId}</p>
          <p>User: {username}</p>

        <div>Online({state.users.length}): {state.users.map((user)=><p className="online" key={user}>{user}</p>)}</div>      
          <Messages />
          <NewMessage handleSubmitForm={handleSubmitForm} input={input} setInput={setInput}/>          
        </div>
        }        
        
      </div>
      <button onClick={handleToggle}>{visible ? 'Hide' : 'More'}</button>
      {visible ? <Container/> : ''}
    </div>
  );
}

export default App;
