import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import {store} from './src/store';
import {NativeBaseProvider} from 'native-base';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppNavigator />
        <Toast />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
