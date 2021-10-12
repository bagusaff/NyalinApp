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
  REMOVE_ALL_LOCAL_DATA,
} from "../constants";

const initialState = {
  notes: [],
  isFetching: false,
  isUploading: false,
  message: "",
};

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_NOTES:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_NOTES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notes: action.payload,
      };
    case FETCH_NOTES_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload,
      };
    case UPLOAD_NOTES_TO_SERVER:
      return {
        ...state,
        isUploading: true,
      };
    case UPLOAD_NOTES_SUCCESS:
      return {
        ...state,
        isUploading: false,
        message: action.payload.message,
      };
    case UPLOAD_NOTES_FAILURE:
      return {
        ...state,
        isUploading: false,
        message: action.payload,
      };
    case UPLOAD_NOTES_TO_LOCAL:
      return {
        ...state,
        notes: [...state.notes, action.payload.data],
      };
    case DELETE_NOTE:
      return {
        ...state,
        isFetching: true,
      };
    case DELETE_NOTE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        message: action.payload,
      };
    case DELETE_NOTE_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload,
      };
    case DELETE_NOTE_LOCAL:
      return {
        ...state,
        notes: state.notes.filter((item) => item.id !== action.payload),
      };
    case EDIT_NOTE_LOCAL:
      const { id, title, note, tags } = action.payload;
      const nextState = state.notes.map((item) => {
        if (item.id !== id) {
          return item;
        }
        return {
          ...item,
          title: title,
          note: note,
          tags: tags,
        };
      });
      return { ...state, notes: nextState };
    case REMOVE_ALL_LOCAL_DATA:
      return initialState;
    default:
      return state;
  }
};

export default NoteReducer;
