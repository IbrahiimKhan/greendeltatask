import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import EmployeeList from '../modules/Employee/EmployeeList';
import AddEmployee from '../modules/Employee/AddEmployee';
import Login from '../modules/Authentication/LogIn';
import EditEmployee from '../modules/Employee/EditEmployee';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EmployeeList" component={EmployeeList} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} />
        <Stack.Screen name="EditEmployee" component={EditEmployee} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
