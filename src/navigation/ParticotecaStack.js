import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import Particoteca from '../screens/Particoteca'
import Author from '../screens/Author'
import DetailWork from '../screens/DetailWork'
import PdfView from '../components/Pdf'

const Stack = createNativeStackNavigator()

const ParticotecaStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={Particoteca} name="Particoteca" />
      <Stack.Screen component={DetailWork} name="ParticotecaDetailWork" />
      <Stack.Screen
        name="ParticotecaPdfView"
        component={PdfView}
        options={{
          title: 'PdfView',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen component={Author} name="ParticotecaAuthor" />
    </Stack.Navigator>
  )
}

export default ParticotecaStack
