import React, {useState, useEffect} from 'react'
import {ThemeProvider} from 'styled-components'
import {SafeAreaView} from 'react-native-safe-area-context'
import {NavigationContainer} from '@react-navigation/native'
import themes from './theme'
import AuthStack from './navigation/AuthStack'
import AppStack from './navigation/AppStack'
import {useSelector} from 'react-redux'
import {isAuthenticatedSelector} from './store/selectors'
import {createTables, getUserHistory} from './utils/SqliteConfig'
import {StripeProvider} from '@stripe/stripe-react-native'
import {ToastProvider} from 'react-native-toast-notifications'

const App = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector)
  const [theme] = useState(themes.light)

  useEffect(() => {
    createTables()
    getUserHistory().then(d => console.log(d))
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <StripeProvider
        publishableKey="pk_test_51KvIQyCokMM2YJtuxT5b53ivfTPm7JxxjjWTnjhuZIXtxBjwVkIWgmbKn2W5R4Sb9AGnu5mk7zcVb9Nea7XJdSSl007taZaKPT"
        merchantIdentifier="merchant.identifier">
        <ToastProvider>
          <ThemeProvider theme={theme}>
            <NavigationContainer>
              {isAuthenticated ? <AppStack /> : <AuthStack />}
            </NavigationContainer>
          </ThemeProvider>
        </ToastProvider>
      </StripeProvider>
    </SafeAreaView>
  )
}

export default App
