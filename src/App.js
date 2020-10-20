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
  
  const typing = true

  const onLogin = async () => {
    dispatch({
      type: 'JOINED', 
      payload: data
    });
    axios.get(`/rooms/${roomId}`).then((res)=>{
      dispatch({
        type: 'SET_DATA',
        payload: res.data,
      })
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

  const addMessage = (obj) => {
    dispatch({
      type: 'NEW_MESSAGES',
      payload: obj, 
    })
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = {
      roomId,
      text: input,
      userName: username
    };
    setInput('');
    socket.emit('ROOM:NEW_MESSAGE', formData);
    addMessage(formData);
  };

  React.useEffect(()=>{     
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage); 
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
          
          <Messages messages={state.messages}/> 
        <p>Status: {state.typing ? `${state.typing} typing...` : ''}</p>         
          <NewMessage 
          dispatch={dispatch}
          handleSubmitForm={handleSubmitForm}
           input={input} 
           setInput={setInput} 
           username={username} 
           roomId={roomId}/> 
                  
        </div>
        }        
        
      </div>
      <button onClick={handleToggle}>{visible ? 'Hide' : 'More'}</button>
      {visible ? <Container/> : ''}
    </div>
  );
}

export default App;
