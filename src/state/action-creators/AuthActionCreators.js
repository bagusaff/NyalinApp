import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE,
  USER_LOGOUT,
  SET_FORM,
  REMOVE_ALL_LOCAL_DATA,
} from "../constants";

import { API_URL } from "@env";
import axios from "axios";

import * as RootNavigation from "../../../RootNavigation";
import Toast from "react-native-toast-message";

export const setForm = (inputType, value) => {
  return { type: SET_FORM, inputType: inputType, inputValue: value };
};

export const loginHandle = (username, password) => (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST });
  axios
    .post(
      API_URL + "login",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data });
      Toast.show({
        type: "success",
        text1: "Login berhasil!",
      });
    })
    .catch((err) => {
      dispatch({ type: USER_LOGIN_FAILURE, payload: err.response });
      Toast.show({
        type: "error",
        text1: "Username / Password salah!",
      });
    });
};

export const registerHandle =
  (username, password, name, email) => (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    axios
      .post(
        API_URL + "register",
        {
          username: username,
          password: password,
          name: name,
          email: email,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        dispatch({ type: USER_REGISTER_SUCCESS, payload: res.data });
        RootNavigation.navigate("Auth");
        Toast.show({
          type: "success",
          text1: "Berhasil mendaftar, silahkan masuk!",
        });
      })
      .catch((err) => {
        dispatch({ type: USER_REGISTER_FAILURE, payload: res.data });
        console.log(err);
        Toast.show({
          type: "error",
          text1: "Terjadi kesalahan, silahkan mendaftar lagi!",
        });
      });
  };

export const logoutHandle = () => (dispatch) => {
  dispatch({ type: REMOVE_ALL_LOCAL_DATA });
  dispatch({ type: USER_LOGOUT });
};
