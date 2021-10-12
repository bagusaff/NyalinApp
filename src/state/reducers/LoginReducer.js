import { SET_FORM } from "../constants";

const initialState = {
  LoginUsername: "",
  LoginPassword: "",
};
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM:
      return {
        ...state,
        [action.inputType]: action.inputValue,
      };
    default:
      return state;
  }
};

export default LoginReducer;
