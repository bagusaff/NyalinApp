import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Income from '../layout/Income.layout';
import SelectCategory from '../layout/SelectCategory.layout';
import Post from '../layout/Post.layout';
import Edit from '../layout/Edit.layout';
import TransactionListCategory from '../layout/TransactionListCategory.layout';
import SearchTransaction from '../layout/SearchTransaction.layout';

// redux
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchAllTransactionsFromServer,
  fetchTransactionsPerCategory,
  fetchAllCategories,
} from '../state';
const TransactionStackScreen = () => {
  const Stack = createStackNavigator();

  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchAllTransactionsFromServer(token));
    dispatch(fetchAllCategories(token));
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Income"
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={Income} name="Income" />
      <Stack.Screen component={SelectCategory} name="SelectCategory" />
      <Stack.Screen component={SearchTransaction} name="SearchTransaction" />
      <Stack.Screen component={Post} name="Post" />
      <Stack.Screen component={Edit} name="Edit" />
      <Stack.Screen
        component={TransactionListCategory}
        name="TransactionListCategory"
      />
    </Stack.Navigator>
  );
};

export default TransactionStackScreen;
