import React from 'react';

function App() {
  const [data, setValue] = React.useState({roomId: '', name: ''});
  const {name, roomId} = data;

  const handlerSubmit = (e) => {
    e.preventDefault();
  };

  const handlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValue({
      ...data, [name]: value
    });     
  };

  return (
    <div className="App">
      <div className="container">
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
            name="name"
            id="name"
            type="text"
            placeholder="name"
            value={name}
            onChange={handlerChange}
            />
        </div>       
        <button disabled={!name&!roomId} className="button" type="submit">ВОЙТИ</button>
      </form>
      </div>
    </div>
  );
}

export default App;
