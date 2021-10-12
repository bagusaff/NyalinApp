import axios from 'axios';

import {
  FETCHING_TRANSACTIONS,
  FETCH_HOMEPAGE_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_TRANSACTIONS_SUCCESS,
  FETCH_DAILY_SUCCESS,
  FETCH_MONTHLY_SUCCESS,
  FETCH_YEARLY_SUCCESS,
  FETCH_CATEGORY_SUCCESS,
  SEARCH_TRANSACTION_SUCCESS,
  CLEAR_SEARCH_RESULT,
} from '../constants';

import {API_URL} from '@env';

export const fetchHomePageTransactions = token => dispatch => {
  const headers = {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  //set Loading to true
  dispatch({type: FETCHING_TRANSACTIONS});
  //fetching from api
  axios
    .get(API_URL + 'mobile/homepage', {headers})
    .then(res => {
      dispatch({type: FETCH_HOMEPAGE_SUCCESS, payload: res.data});
    })
    .catch(err => console.log(err));
};

export const fetchAllTransactionsFromServer = token => dispatch => {
  const headers = {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  //set Loading to true
  dispatch({type: FETCHING_TRANSACTIONS});
  //fetching from api
  axios
    .get(API_URL + 'transaction/user', {headers})
    .then(res =>
      dispatch({type: FETCH_TRANSACTIONS_SUCCESS, payload: res.data}),
    )
    .catch(err => console.log(err));
};

export const fetchAllCategories = token => dispatch => {
  const headers = {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  //set Loading to true
  dispatch({type: FETCHING_TRANSACTIONS});
  //fetching from api
  axios
    .get(API_URL + 'category', {headers})
    .then(res => {
      dispatch({type: FETCH_CATEGORY_SUCCESS, payload: res.data});
    })
    .catch(err => console.log(err));
};

export const fetchTransactionsPerCategory = (type, token) => dispatch => {
  const headers = {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  //set Loading to true
  dispatch({type: FETCHING_TRANSACTIONS});
  axios
    .all([
      axios.get(API_URL + `transaction/filter?type=${type}&range=daily`, {
        headers,
      }),
      axios.get(API_URL + `transaction/filter?type=${type}&range=monthly`, {
        headers,
      }),
      axios.get(API_URL + `transaction/filter?type=${type}&range=yearly`, {
        headers,
      }),
    ])
    .then(
      axios.spread((data1, data2, data3) => {
        dispatch({type: FETCH_DAILY_SUCCESS, payload: data1.data});
        dispatch({type: FETCH_MONTHLY_SUCCESS, payload: data2.data});
        dispatch({type: FETCH_YEARLY_SUCCESS, payload: data3.data});
      }),
    )
    .catch(err => console.log(err.response));
};

export const searchTransaction = (keyword, token) => dispatch => {
  const headers = {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  //set Loading to true
  dispatch({type: FETCHING_TRANSACTIONS});

  axios
    .get(API_URL + `transaction/user?keyword=${keyword}`, {headers})
    .then(res => {
      dispatch({type: SEARCH_TRANSACTION_SUCCESS, payload: res.data});
    })
    .catch(err => console.log(err));
};

export const clearSearchResult = () => dispatch => {
  dispatch({type: CLEAR_SEARCH_RESULT});
};
