import React, {useEffect, useState} from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import { Card, Overlay } from 'react-native-elements';
import { getAnnotation } from '../../utils/RealmDb';

const Notes = (props) => {
  const { page, notes, _id, draw } = props.data.item
  const { setPage, idPartitura, setIsDraw } = props

  return (
    <TouchableOpacity onPress={() => {
      setPage(page)
      setIsDraw(false)
    }}>
      {
        _id === idPartitura &&
        notes.length > 0 && <Text style={styles.notes}>{`Page: ${page}: ${notes[0]?.txt}`}</Text>
      } 
      {
        _id === idPartitura &&
        draw.length > 0 && <Text style={styles.notes}>{`Page: ${page}: Draw`}</Text>
      } 
    </TouchableOpacity>
  )
}

const Annotations = props => {
  const [dataRdb, setDataRdb] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const { data, hide, setPage, idPartitura, setIsDraw } = props
  const { page, txt } = data
  
  const getData = async() => {
   const data =  await getAnnotation()
   setDataRdb(data)
   setIsVisible(!isVisible)
  }
  
  useEffect(() => {
    getData()
  }, [])

  return (
    <View>
      <Overlay  
        isVisible={isVisible} 
        overlayStyle={{ borderRadius: 10, width: '90%', height:'90%' }}
        onBackdropPress={() => {
          setIsVisible(!isVisible)
          hide()
        }}
        >
            <TouchableOpacity
              onPress={() => {
                setIsVisible(!isVisible)
                hide()
              }}
              style={{
                alignItems: 'flex-end',
                paddingRight: 10,
                height: '3%',
              }}>
             <Text style={{
               fontSize: 18,
               fontWeight: '600'
             }}>
                X
             </Text>
           </TouchableOpacity>    
        <Card containerStyle={styles.card}>
            <Card.Title style={{ 
              flexDirection: 'row',
              color: '#000' ,
              fontSize: 34,
              alignSelf:'flex-start'
              }}>
                Notas
            </Card.Title>
          <FlatList
            data={dataRdb}
            renderItem={item => <Notes setIsDraw={setIsDraw} data={item} idPartitura={idPartitura} setPage={setPage} />}
          />
        </Card>
      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'purple'
  },
  txt: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Annotations
