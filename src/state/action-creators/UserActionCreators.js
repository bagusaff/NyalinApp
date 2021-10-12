import axios from "axios";
import { API_URL } from "@env";
import Toast from "react-native-toast-message";

import {
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_FAILURE,
  CHANGE_PASSWORD_RESPONSE,
} from "../constants";

export const updateProfileHandle =
  (userId, updatedName, token) => (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    axios
      .put(
        API_URL + "user/" + userId,
        {
          name: updatedName,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Berhasil memperbarui nama!😊",
        });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: res.data });
      })
      .catch((err) => dispatch({ type: USER_UPDATE_FAILURE }));
  };

export const updatePassword =
  (userId, oldPassword, newPassword, token) => (dispatch) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    axios
      .put(
        API_URL + "user/password/" + userId,
        {
          old_password: oldPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        dispatch({ type: CHANGE_PASSWORD_RESPONSE, payload: res.data });
        Toast.show({
          type: "success",
          text1: "Berhasil memperbarui password!",
        });
      })
      .catch((err) => {
        dispatch({
          type: CHANGE_PASSWORD_RESPONSE,
          payload: err.response.data,
        });
        Toast.show({
          type: "error",
          text1: err.response.data.message,
        });
      });
  };
