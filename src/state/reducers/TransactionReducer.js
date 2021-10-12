import {
  FETCHING_TRANSACTIONS,
  FETCH_HOMEPAGE_SUCCESS,
  FETCH_TRANSACTIONS_FAILURE,
  FETCH_TRANSACTIONS_SUCCESS,
  UPLOAD_TRANSACTION_TO_LOCAL,
  UPLOAD_TRANSACTION_TO_SERVER,
  FETCH_DAILY_SUCCESS,
  FETCH_MONTHLY_SUCCESS,
  FETCH_YEARLY_SUCCESS,
  FETCH_CATEGORY_SUCCESS,
  EDIT_TRANSACTION_LOCAL,
  UPLOADING,
  REMOVE_ALL_LOCAL_DATA,
  DELETE_TRANSACTION,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_LOCAL,
  SEARCH_TRANSACTION_SUCCESS,
  CLEAR_SEARCH_RESULT,
} from '../constants';

const initialState = {
  transactions: [],
  transactionsFromServer: [],
  transactionsOnLocal: [],
  editedTransactionsOnLocal: [],
  homePageTransactions: [],
  dailyTransactions: [],
  monthlyTransactions: [],
  yearlyTransactions: [],
  searchResults: [],
  categories: [],
  isUploading: false,
  isFetching: false,
  error: false,
  message: '',
};
const TransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_TRANSACTIONS:
      return {
        ...state,
        isFetching: true,
      };
    case UPLOADING:
      return {
        ...state,
        isUploading: true,
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        transactions: action.payload,
        transactionsFromServer: action.payload,
      };
    case FETCH_HOMEPAGE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        homePageTransactions: action.payload,
      };
    case FETCH_TRANSACTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: true,
      };
    case UPLOAD_TRANSACTION_TO_LOCAL:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
        transactionsOnLocal: [...state.transactionsOnLocal, action.payload],
      };
    case UPLOAD_TRANSACTION_TO_SERVER:
      return {
        ...state,
        isUploading: false,
        transactions: [...state.transactions, action.payload.data],
        message: action.payload.message,
      };
    case FETCH_DAILY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        dailyTransactions: action.payload,
      };
    case FETCH_MONTHLY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        monthlyTransactions: action.payload,
      };
    case FETCH_YEARLY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        yearlyTransactions: action.payload,
      };
    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        categories: action.payload,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_TRANSACTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        message: action.payload,
      };
    case DELETE_TRANSACTION_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    case DELETE_TRANSACTION_LOCAL:
      return {
        ...state,
        transactions: state.transactions.filter(
          item => item.id !== action.payload,
        ),
      };
    case SEARCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        searchResults: action.payload,
      };
    case CLEAR_SEARCH_RESULT:
      return {
        ...state,
        searchResults: [],
      };
    case EDIT_TRANSACTION_LOCAL:
      const {id, note, amount, date} = action.payload;
      const nextState = state.transactions.map(item => {
        if (item.id !== id) {
          // not our item, return it as is
          return item;
        }
        // this is our relevant item, return a new copy of it with modified fields
        return {
          ...item,
          note: note,
          amount: amount,
          date: date,
        };
      });

      return {...state, transactions: nextState};
    case REMOVE_ALL_LOCAL_DATA:
      return initialState;
    default:
      return state;
  }
};

export default TransactionReducer;
