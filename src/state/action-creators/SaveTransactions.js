import {
  UPLOAD_TRANSACTION_TO_LOCAL,
  UPLOAD_TRANSACTION_TO_SERVER,
  SYNC_TRANSACTIONS_TO_SERVER,
  UPDATE_TRANSACTION_SUCCESS,
  EDIT_TRANSACTION_LOCAL,
  UPLOADING,
  DELETE_TRANSACTION,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_LOCAL,
} from '../constants';

import axios from 'axios';
import {API_URL} from '@env';
import Toast from 'react-native-toast-message';

export const uploadTransactionToLocal = data => dispatch => {
  dispatch({type: UPLOADING});
  try {
    dispatch({type: UPLOAD_TRANSACTION_TO_LOCAL, payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const uploadTransactionToServer = data => dispatch => {
  const {user_id, type_id, category_id, note, amount, date, token} = data;
  axios
    .post(
      API_URL + 'transaction',
      {
        user_id: user_id,
        type_id: type_id,
        category_id: category_id,
        note: note,
        amount: amount,
        date: date,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
    .then(res => {
      dispatch({type: UPLOAD_TRANSACTION_TO_SERVER, payload: res.data});
      Toast.show({
        type: 'success',
        text1: 'Transaksi berhasil ditambahkan! 😊',
      });
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan , silahkan coba lagi! 😞',
      });
    });
};

export const deleteTransactionsLocal =
  ({id}) =>
  dispatch => {
    try {
      dispatch({type: DELETE_TRANSACTION_LOCAL, payload: id});
    } catch (err) {
      console.log(err);
    }
  };

export const deleteTransactions =
  ({id, token}) =>
  dispatch => {
    dispatch({type: DELETE_TRANSACTION});
    axios
      .delete(API_URL + `transaction/${id}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        dispatch({
          type: DELETE_TRANSACTION_SUCCESS,
          payload: res.data.message,
        });
        Toast.show({
          type: 'success',
          text1: 'Transaksi berhasil dihapus!',
        });
      })
      .catch(err => {
        dispatch({
          type: DELETE_TRANSACTION_FAILURE,
        });
        console.log(err.response);
        Toast.show({
          type: 'error',
          text1: 'Terjadi kesalahan.',
        });
      });
  };

export const updateTransactions = data => dispatch => {
  const {user_id, post_id, note, amount, date, token} = data;
  axios
    .put(
      API_URL + `transaction/${post_id}`,
      {
        note: note,
        amount: amount,
        date: date,
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      },
    )
    .then(res => {
      dispatch({type: UPDATE_TRANSACTION_SUCCESS, payload: res.data.message});
      dispatch({
        type: EDIT_TRANSACTION_LOCAL,
        payload: {
          id: post_id,
          note: note,
          amount: amount,
          date: date,
        },
      });
      Toast.show({
        type: 'success',
        text1: 'Transaksi berhasil diperbarui! 😊',
      });
    })
    .catch(err => {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan , silahkan coba lagi! 😞',
      });
    });
};
