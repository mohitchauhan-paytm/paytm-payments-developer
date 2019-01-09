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
        showLogin: action.showLogin,
        showMainLogIn: action.showMainLogIn,
      });

    case 'TOGGLE_MAIN_SHOW_LOGIN': 
    return Object.assign({}, state, {
      showMainLogIn: action.showMainLogIn
    });

    case 'TOGGLE_SHOW_LOGGEDIN_POPUP':
    return Object.assign({},state, {
      showLoggedIn: action.showLoggedIn
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
  showApiMenu: false,
  showMainLogIn: true,
  showLoggedIn: false,
}
const createStore = () => reduxCreateStore(reducer, initialState);

export default createStore;