import React, {useState, useEffect} from 'react'
import {useToast} from 'react-native-toast-notifications'
import {useDispatch} from 'react-redux'

import * as S from './styles'
import Icon from 'react-native-vector-icons/Feather'
import Text from '../../components/Text'
import Button from '../../components/Button'
import {CardField, useStripe} from '@stripe/stripe-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WorkService from '../../services/workService'
import UserServices from '../../services/userService'
import PurchaseService from '../../services/purchaseService'
import {setMispartituras} from '../../store/features/MispartiturasSlice'

const Payment = ({navigation, route}) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const stripe = useStripe()
  const {item} = route.params
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState('')

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getData()
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('dataUser')
      const data = jsonValue != null ? JSON.parse(jsonValue) : null
      setUser(data.user.id)
    } catch (e) {
      console.log(e)
    }
  }

  const getWorksBeforePayment = async () => {
    try {
      const config = JSON.parse(await AsyncStorage.getItem('dataUser'))
      const userSession = await UserServices.getUser(config.user.id)
      const worksData = await WorkService.getWorkForUser(user)
      const filterWork = worksData.data.docs.works
        .filter(w => userSession.data.docs.licensed.includes(w.id))
        .map(w => w)
      dispatch(setMispartituras(filterWork))
    } catch (error) {}
  }

  const handleSubmit = async () => {
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      paymentMethodType: 'Card',
    })

    const {id} = paymentMethod
    try {
      setLoading(true)
      let data = {
        id: id,
        user: user,
        work: item.id,
        amount: item.price,
      }
      const response = await PurchaseService.purchase(data)
      toast.show('Pago registrado con exito!', {
        type: 'success',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      })
      setLoading(false)
      setTimeout(() => {
        return getWorksBeforePayment()
      }, 2000)
      navigation.navigate('Mis Partituras')
    } catch (err) {
      console.log(err)
      toast.show('Error al procesar el pago!', {
        type: 'danger',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      })
      setLoading(false)
    }
  }

  return (
    <S.Payment>
      <S.Top>
        <S.Close onPress={() => navigation.goBack()}>
          <Icon name="x" size={24} color="black" />
        </S.Close>

        <S.Cover source={{uri: item.cover}} />

        <Text size="large" color="black" family="primary">
          {item.title}
        </Text>

        <Text size="normal" color="black">
          {item.author.name}
        </Text>

        <Text size="normal" color="gray">
          {item.instrumentation}
        </Text>
      </S.Top>
      <S.Stripe>
        {!loading ? (
          <Button
            label={`Pagar ${item.price / 100} €`}
            onPress={handleSubmit}
          />
        ) : (
          <Text size="normal" color="primary">
            Cargando......
          </Text>
        )}
      </S.Stripe>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {}}
        onFocus={focusedField => {}}
      />
    </S.Payment>
  )
}

export default Payment
