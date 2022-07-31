import React, {useContext} from 'react'
import {getFocusedRouteNameFromRoute} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import {ThemeContext} from 'styled-components'

import HomeStack from './HomeStack'
import ParticotecaStack from './ParticotecaStack'
import MoreStack from './MoreStack'
import MisPartiturasStack from './MisPartiturasStack'

const Tab = createBottomTabNavigator()

const AppStack = () => {
  const {colors} = useContext(ThemeContext)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.graydark,
        tabBarShowLabel: true,
      }}>
      <Tab.Screen
        component={HomeStack}
        name="Inicio"
        options={({route}) => ({
          tabBarStyle: {display: getTabBarVisibility(route)},
          tabBarIcon: ({color, size}) => (
            <Icon name="home-sharp" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        component={ParticotecaStack}
        name="Particoteca"
        options={({route}) => ({
          tabBarStyle: {display: getTabBarVisibility(route)},
          tabBarIcon: ({color, size}) => (
            <Icon name="book" size={22} color={color} />
          ),
        })}
      />
      <Tab.Screen
        component={MisPartiturasStack}
        name="Mis Partituras"
        options={({route}) => ({
          tabBarStyle: {display: getTabBarVisibility(route)},
          tabBarIcon: ({color, size}) => (
            <Icon name="folder" size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        component={MoreStack}
        name="Mas"
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="menu-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ??  'Feed'

  switch (routeName) {
    case 'misPartituraPdfView':
      return 'none'
  
    case 'ParticotecaPdfView':
      return 'none'

    case 'pdfView':
      return 'none'

    default:
      return 'flex'
  }
}

export default AppStack
