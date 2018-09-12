import {createStore as reduxCreateStore} from 'redux'; 

const reducer = (state, action) => {
  switch(action.type)  {
    case 'TOGGLE_SHOW_LOGIN':
      return Object.assign({}, state, {
        showLogin: action.showLogin
      });
    
    case 'TOGGLE_SHOW_APIMENU':
      return Object.assign({}, state, {
        showApiMenu: action.showApiMenu
      });

    case 'SET_LOGIN_DATA':
      return Object.assign({}, state, {
        loggedIn: action.loggedIn,
        user: action.user,
        userText: action.userText,
        showLogin: action.showLogin
      });

    default:
      return state;
   
  }  
}

const initialState = {
  user: {},
  userText: '',
  showLogin: false,
  loggedIn: false,
  showApiMenu: false
}
const createStore = () => reduxCreateStore(reducer, initialState);

export default createStore;