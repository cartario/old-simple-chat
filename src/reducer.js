export const initialState = {
  joined: false,
  roomId: null,
  username: null,
  users: [],
  messages: [],
  typing: null
};

export const reducer = (state, action) => {
  switch(action.type){
    case 'JOINED':
      return {...state, joined: true, roomId: action.payload.roomId, username: action.payload.username};
    case 'SET_USERS':
      return {...state, users: action.payload};
    case 'SET_DATA':
      return {...state, 
        users: action.payload.users,
        messages: action.payload.messages,
      };
    case 'NEW_MESSAGES':
      return {...state, messages: [...state.messages, action.payload]};
    case 'SET_TYPING':
      return {...state, typing: action.payload}
    default:
      return state;
  }
};
