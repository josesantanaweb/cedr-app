import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Register from '../screens/Register'
import RecoverPassword from '../screens/RecoverPassword'

const Stack = createNativeStackNavigator()

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Register" />
      <Stack.Screen component={RecoverPassword} name="RecoverPassword" />
    </Stack.Navigator>
  )
}

export default AuthStack
