import React, {useState, useContext, useEffect} from 'react'
import {ThemeContext} from 'styled-components'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Input from '../../components/Input'
import Button from '../../components/Button'
import Text from '../../components/Text'
import Select from '../../components/Select'
import Icon from 'react-native-vector-icons/FontAwesome'
import UserServices from '../../services/userService'
import InstrumentServices from '../../services/instrumentService'
import * as S from './styles'

const Profile = ({navigation}) => {
  const {colors} = useContext(ThemeContext)
  const [openSelectInstruments, setOpenSelectInstruments] = useState(false)
  const [instrument, setInstrument] = useState({})
  const [instrumentData, setInstrumentData] = useState([])
  const [user, setUser] = useState()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getUser()
      getInstruments()
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const loadIntrument = data => {
  //   const activeinstrument = response.data.docs.find(
  //     d => user.instrument.id === d.id
  //   )
  //   if (activeinstrument) {
  //     const comprobar = {
  //       label: activeinstrument.name,
  //       value: activeinstrument.id,
  //     }
  //     setInstrument(comprobar)
  //   }
  // }

  useEffect(() => {
    if (user && name.length < 1) {
      setName(user?.name)
      setSurname(user?.surname)
    }
    if (user && surname.length < 1) {
      setSurname(user?.surname)
    }
  }, [user, name, surname])

  const getUser = async () => {
    try {
      const config = JSON.parse(await AsyncStorage.getItem('dataUser'))
      const response = await UserServices.getUser(config.user.id)
      setUser(response.data.docs)
    } catch (error) {}
  }

  const getInstruments = async () => {
    try {
      const response = await InstrumentServices.getInstruments()
      const data = response.data.docs.map(item => ({
        label: item.name,
        value: item.id,
      }))
      setInstrumentData(data)
      if (response !== undefined) {
        setInstrument(data[0])
      }
    } catch (error) {}
  }

  const updateUser = async () => {
    const formData = {
      name: name,
      surname: surname,
      instrument: instrument.value,
    }
    try {
      const response = await UserServices.updateUser(user.id, formData)
      setUser(response.data.docs)
    } catch (error) {
      console.log('hello', error)
    }
  }

  const hanleOpenSelectInstruments = () =>
    setOpenSelectInstruments(!openSelectInstruments)

  const hanleSelectedInstruments = opt => {
    setInstrument(opt)
    setOpenSelectInstruments(false)
    console.log(opt)
  }

  return (
    <S.Profile>
      <S.Back onPress={() => navigation.goBack()}>
        <Icon name="angle-left" size={24} color={colors.black} />
        <Text color="black" size="medium">
          Mas
        </Text>
      </S.Back>
      <S.Row>
        <Input
          onChangeText={s => setName(s)}
          label="Nombre"
          defaultValue={user?.name}
        />
      </S.Row>
      <S.Row>
        <Input
          onChangeText={s => setSurname(s)}
          label="Apellidos"
          defaultValue={user?.surname}
        />
      </S.Row>
      <S.Row>
        <Select
          option={instrument}
          data={instrumentData}
          open={openSelectInstruments}
          hanleSelected={hanleSelectedInstruments}
          hanleOpen={hanleOpenSelectInstruments}
          label="Instrumento"
        />
      </S.Row>
      <S.Row>
        <Input label="Email" editable={false} defaultValue={user?.email} />
      </S.Row>
      <S.Footer>
        <Button label="Guardar" onPress={updateUser} />
      </S.Footer>
    </S.Profile>
  )
}

export default Profile
