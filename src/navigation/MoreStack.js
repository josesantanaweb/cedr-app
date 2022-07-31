import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import More from '../screens/More'
import Profile from '../screens/Profile'
import Setting from '../screens/Setting'

const Stack = createNativeStackNavigator()

const MoreStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={More} name="More" />
      <Stack.Screen component={Profile} name="Profile" />
      <Stack.Screen component={Setting} name="Setting" />
    </Stack.Navigator>
  )
}

export default MoreStack
