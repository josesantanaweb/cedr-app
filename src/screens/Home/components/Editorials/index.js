import React, {useState, useEffect} from 'react'
import {FlatList} from 'react-native'
import Text from '../../../../components/Text'
import EditorialsService from '../../../../services/editorialsService'

import * as S from './styles'

const Editorials = ({navigation}) => {
  const [editorials, setEditorials] = useState([])

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      getEditorials()
    }
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getEditorials = async () => {
    try {
      const editorialsData = await EditorialsService.getEditorials()
      setEditorials(editorialsData.data.docs)
    } catch (error) {}
  }

  const renderItem = ({item}) => {
    return (
      <S.EditorialsItem
        onPress={() => {
          navigation.navigate('HomeDetailEditorials', {
            item: item,
          })
        }}>
        <Text size="normal" color="white">
          {item.name}
        </Text>
      </S.EditorialsItem>
    )
  }
  return (
    <S.Editorials>
      <S.EditorialsTop>
        <Text size="normal" color="black">
          Editoriales
        </Text>
      </S.EditorialsTop>

      <FlatList
        data={editorials}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </S.Editorials>
  )
}

export default Editorials
