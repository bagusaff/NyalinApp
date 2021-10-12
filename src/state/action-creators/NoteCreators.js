import axios from 'axios';

import {
  FETCH_ALL_NOTES,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_FAILURE,
  UPLOAD_NOTES_TO_SERVER,
  UPLOAD_NOTES_TO_LOCAL,
  UPLOAD_NOTES_SUCCESS,
  UPLOAD_NOTES_FAILURE,
  DELETE_NOTE,
  DELETE_NOTE_SUCCESS,
  DELETE_NOTE_FAILURE,
  DELETE_NOTE_LOCAL,
  EDIT_NOTE,
  EDIT_NOTE_LOCAL,
} from '../constants';
import Toast from 'react-native-toast-message';

import {API_URL} from '@env';

export const fetchAllNotes = token => dispatch => {
  const headers = {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  //set loading to true
  dispatch({type: FETCH_ALL_NOTES});

  //fetch from API
  axios
    .get(API_URL + 'note/user', {headers})
    .then(res => {
      dispatch({type: FETCH_NOTES_SUCCESS, payload: res.data});
    })
    .catch(err => {
      console.log(err);
      dispatch({type: FETCH_NOTES_FAILURE, payload: err.response});
    });
};

export const uploadNotes = data => dispatch => {
  const {user_id, title, note, tags, token} = data;
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
  };
  //set loading to true
  dispatch({type: UPLOAD_NOTES_TO_SERVER});

  //axios post
  axios
    .post(
      API_URL + 'note',
      {
        user_id: user_id,
        title: title,
        note: note,
        tags: tags,
      },
      {headers},
    )
    .then(res => {
      dispatch({type: UPLOAD_NOTES_SUCCESS, payload: res.data});
      dispatch({type: UPLOAD_NOTES_TO_LOCAL, payload: res.data});
      Toast.show({
        type: 'success',
        text1: 'Catatan berhasil ditambahkan! 😊.',
      });
    })
    .catch(err => {
      dispatch({type: UPLOAD_NOTES_FAILURE, payload: err.response});
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan , silahkan coba lagi! 😞',
      });
    });
};

export const deleteNotes =
  ({id, token}) =>
  dispatch => {
    const headers = {
      Accept: 'application/json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    };
    //set loading
    dispatch({type: DELETE_NOTE});

    try {
      dispatch({type: DELETE_NOTE_LOCAL, payload: id});
      axios
        .delete(API_URL + `note/${id}`, {headers})
        .then(res => {
          dispatch({type: DELETE_NOTE_SUCCESS, payload: res.data.message});
          Toast.show({
            type: 'success',
            text1: 'Catatan berhasil dihapus! 😊',
          });
        })
        .catch(err => {
          dispatch({type: DELETE_NOTE_FAILURE, payload: err.response});
          Toast.show({
            type: 'error',
            text1: 'Terjadi kesalahan menghapus data dari server! 😞',
          });
        });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: 'error',
        text1: 'Terjadi kesalahan dengan koneksi! 😞',
      });
    }
  };

export const updateNotes = data => dispatch => {
  const {note_id, note, title, tags, token} = data;
  const headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
  };

  try {
    axios
      .put(
        API_URL + `note/${note_id}`,
        {
          note: note,
          title: title,
          tags: tags,
        },
        {headers},
      )
      .then(res => {
        Toast.show({
          type: 'success',
          text1: 'Catatan berhasil diperbarui! 😊.',
        });
        dispatch({
          type: EDIT_NOTE_LOCAL,
          payload: {
            id: note_id,
            note: note,
            title: title,
            tags: tags,
          },
        });
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Terjadi kesalahan memperbarui catatan! 😞',
        });
      });
  } catch (err) {
    console.log(err);
    Toast.show({
      type: 'error',
      text1: 'Terjadi kesalahan dengan koneksi! 😞',
    });
  }
};
