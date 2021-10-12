import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNavigation';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

//Layout
import Auth from './src/layout/Auth.layout';
import Register from './src/layout/Register.layout';
import Drawer from './src/navigation/Drawer';
import {store, persistor} from './src/state/store';
import {PersistGate} from 'redux-persist/es/integration/react';
import {useSelector, useDispatch} from 'react-redux';

import {logoutHandle} from './src/state';

import Toast from 'react-native-toast-message';
//function redux
import {checkConnection} from './src/state';
const AppWrapper = () => {
  const Stack = createStackNavigator();
  const {isLoggedIn} = useSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);

  //Redux Store
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.user);
  const {isConnected} = useSelector(state => state.connection);

  //UseEffect
  useEffect(() => {
    const unsubscribe = dispatch(checkConnection());
    console.log('Device Connection is now : ', isConnected);
  }, [isConnected]);

  if (isLoading) {
    console.log('loading');
  } else {
    return (
      <NavigationContainer ref={navigationRef}>
        {!isLoggedIn ? (
          <Stack.Navigator
            initialRouteName="Auth"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        ) : (
          <Drawer />
        )}
        <Toast ref={ref => Toast.setRef(ref)} />
      </NavigationContainer>
    );
  }
};

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  );
}
