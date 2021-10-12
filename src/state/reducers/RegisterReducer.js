import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  SET_FORM,
} from "../constants";

const initialState = {
  fullName: "",
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
  loading: false,
  status: {},
};
const RegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM:
      return {
        ...state,
        [action.inputType]: action.inputValue,
      };
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        status: action.payload,
      };
    case USER_REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default RegisterReducer;
