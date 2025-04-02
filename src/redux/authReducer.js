import { LOGIN_SUCCESS, LOGOUT } from './authActions';

const initialState = {
  user: null,
  isAdmin: false,
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAdmin: action.payload.isAdmin,
        isAuthenticated: true
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;