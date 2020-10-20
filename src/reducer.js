export const reducer = (state, action) => {
  switch(action.type){
    case 'JOINED':
      return {...state, joined: true, roomId: action.payload.roomId, username: action.payload.username};
    case 'SET_USERS':
      return {...state, users: action.payload};
    case 'SET_MESSAGES':
      return {...state, messages: action.payload}
    default:
      return state;
  }
};

export const initialState = {
  joined: false,
  roomId: null,
  username: null,
  users: [],
  messages: []
};
