import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '../screens/Home'
import PdfView from '../components/Pdf'
import DetailWork from '../screens/DetailWork'
import Author from '../screens/Author'
import DetailEditorials from '../screens/DetailEditorials'
import Payment from '../screens/Payment'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
      <Stack.Screen
        name="pdfView"
        component={PdfView}
        options={{
          title: 'PdfView',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen component={DetailWork} name="HomeDetailWork" />
      <Stack.Screen component={Author} name="HomeAuthor" />
      <Stack.Screen component={DetailEditorials} name="HomeDetailEditorials" />
      <Stack.Screen component={Payment} name="Payment" />
    </Stack.Navigator>
  )
}

export default HomeStack
