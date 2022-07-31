import React, {useContext, useState, useEffect} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import {useToast} from 'react-native-toast-notifications'
import {View} from 'react-native'
import {useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import WorkService from '../../services/workService'
import UserServices from '../../services/userService'
import {viewPdf as vWork} from '../../utils/Validations'
import Text from '../../components/Text'
import Button from '../../components/Button'
import Top from './components/Top'
import * as S from './styles'
import {ThemeContext} from 'styled-components'
import {setMispartituras} from '../../store/features/MispartiturasSlice'

const Detail = ({navigation, route}) => {
  const dispatch = useDispatch()
  const toast = useToast()
  const {colors} = useContext(ThemeContext)
  const {item, mispartituras, particoteca, home} = route.params
  const [role, setRole] = useState()
  const [user, setUser] = useState('')
  const [isWork, setIsWork] = useState(null)

  const parserIsWork = async () => {
    const data = await vWork(item)
    setIsWork(data)
  }

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getRole()
      getData()
    }
    parserIsWork()
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getRole = async () => {
    const config = JSON.parse(await AsyncStorage.getItem('dataUser'))
    setRole(config.user.roles[0].value)
  }

  const viewPdf = opt => {
    switch (opt) {
      case 'home':
        navigation.navigate('pdfView', {
          item: item,
          home: true,
        })
        break
      case 'particoteca':
        navigation.navigate('ParticotecaPdfView', {
          item: item,
          particoteca: true,
        })
        break
      default:
        navigation.navigate('MisPartiturasPdfView', {
          item: item,
          mispartituras: true,
        })
        break
    }
  }

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

  const handleGetWork = async () => {
    const data = {
      user: user,
      work: item.id,
    }
    try {
      const response = await WorkService.addWorktoUser(data)
      toast.show('Partitura obtenida con exito!', {
        type: 'success',
        placement: 'top',
        duration: 2000,
        offset: 30,
        animationType: 'slide-in',
      })
      setTimeout(() => {
        return getWorksBeforePayment()
      }, 2000)
      navigation.navigate('Mis Partituras')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <S.Detail>
      <Top navigation={navigation} item={item} />
      <S.Section>
        <S.RatingWrapper>
          <S.Rating>
            <S.RatingItem>
              <Icon name="star" size={18} color="#FFE24B" />
            </S.RatingItem>
            <S.RatingItem>
              <Icon name="star" size={18} color="#FFE24B" />
            </S.RatingItem>
            <S.RatingItem>
              <Icon name="star" size={18} color="#FFE24B" />
            </S.RatingItem>
            <S.RatingItem>
              <Icon name="star" size={18} color={colors.gray} />
            </S.RatingItem>
            <S.RatingItem>
              <Icon name="star" size={18} color={colors.gray} />
            </S.RatingItem>
          </S.Rating>
          <Text size="small" color="gray">
            136 valoraciones
          </Text>
        </S.RatingWrapper>
        <S.ViewMore>
          <Icon name="ellipsis-h" size={18} color={colors.grayDark} />
        </S.ViewMore>
      </S.Section>
      <S.ShopButton>
        {isWork && home ? (
          <Button label="Abrir" onPress={() => viewPdf('home')} />
        ) : (
          home && (
            <Button
              label={`Comprar ${item.price / 100} €`}
              onPress={() => navigation.navigate('Payment', {item: item})}
            />
          )
        )}
        {isWork && particoteca ? (
          <Button label="Abrir" onPress={() => viewPdf('particoteca')} />
        ) : (
          particoteca && <Button label="Obtener" onPress={handleGetWork} />
        )}
        {mispartituras && (
          <Button label="Abrir" onPress={() => viewPdf('mispartituras')} />
        )}
      </S.ShopButton>
      <S.Description>
        <View style={{marginBottom: 10}}>
          <Text size="normal" color="black">
            Descripción
          </Text>
          <Text size="small" color="black">
            Géneros: Educación musical: Repertorio de estudio instrumental.
          </Text>
        </View>
        <View style={{marginBottom: 10}}>
          <Text size="normal" color="black">
            Contenido
          </Text>
          <View style={{marginTop: 10}}>
            <Text size="small" color="black">
              Contenido
            </Text>
          </View>
        </View>
      </S.Description>
    </S.Detail>
  )
}

export default Detail
