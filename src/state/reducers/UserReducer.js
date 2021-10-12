import {
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAILURE,
  USER_UPDATE_SUCCESS,
  USER_LOGOUT,
  CHANGE_PASSWORD_RESPONSE,
} from "../constants";

const initialState = {
  isLoggedIn: false,
  userData: {},
  error: false,
  loading: false,
  token: "",
  message: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        isLoggedIn: false,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        error: false,
        token: action.payload.token,
        userData: action.payload.data,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        isLoggedIn: false,
        token: "",
        userData: action.payload,
      };
    case USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_PASSWORD_RESPONSE:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
      };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload.user,
        message: action.payload.message,
      };
    case USER_UPDATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
      };
    case USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default UserReducer;
