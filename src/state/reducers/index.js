import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import RegisterReducer from "./RegisterReducer";
import TransactionReducer from "./TransactionReducer";
import ConnectionReducer from "./ConnectionReducer";
import UserReducer from "./UserReducer";
import NoteReducer from "./NoteReducer";

import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["login", "register", "transaction", "user", "note"],
};

const reducers = combineReducers({
  login: LoginReducer,
  register: RegisterReducer,
  transaction: TransactionReducer,
  connection: ConnectionReducer,
  user: UserReducer,
  note: NoteReducer,
});

export default persistReducer(persistConfig, reducers);
