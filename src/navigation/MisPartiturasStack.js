import React from 'react'

import {createNativeStackNavigator} from '@react-navigation/native-stack'

import MisPartituras from '../screens/MisPartituras'
import Collection from '../screens/Collection'
import DetailWork from '../screens/DetailWork'
import CollectionWork from '../screens/MisPartituras/components/WorkCollections'
import PdfView from '../components/Pdf'

const Stack = createNativeStackNavigator()

const MisPartiturasStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={MisPartituras} name="MisPartituras" />
      <Stack.Screen component={Collection} name="Collection" />
      <Stack.Screen component={CollectionWork} name="CollectionWork" />
      <Stack.Screen component={DetailWork} name="MisPartiturasDetailWork" />
      <Stack.Screen
        name="misPartituraPdfView"
        component={PdfView}
        options={{
          title: 'PdfView',
          contentStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Stack.Navigator>
  )
}

export default MisPartiturasStack
