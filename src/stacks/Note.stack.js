import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NoteList from "../layout/NoteList.layout";
import CreateNote from "../layout/CreateNote.layout";
import EditNote from "../layout/EditNote.layout";
import NoteListTag from "../layout/NoteListTag.layout";

// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotes } from "../state";

const NoteStackScreen = () => {
  const Stack = createStackNavigator();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAllNotes(token));
  }, []);
  return (
    <Stack.Navigator
      initialRouteName="NoteList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={NoteList} name="NoteList" />
      <Stack.Screen component={CreateNote} name="CreateNote" />
      <Stack.Screen component={EditNote} name="EditNote" />
      <Stack.Screen component={NoteListTag} name="NoteListTag" />
    </Stack.Navigator>
  );
};

export default NoteStackScreen;
