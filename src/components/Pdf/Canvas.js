import React, {useState} from "react"
import {StyleSheet, Text, View, TouchableOpacity, Image} from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {Slider, Overlay} from "react-native-elements"
import {SketchCanvas} from "@lighthouse/react-native-sketch-canvas"
import {changeStatus} from "../../utils/RealmDb"
import settingsImg from "../../assets/img/setting.png"

const Canvas = ({
  data,
  movePage,
  edit,
  setEdit,
  idUser,
  document,
  color,
  setColor,
  isActiveEraser,
  isActiveMarker,
  isActivePen,
  isUndoActions,
  setIsUndoActions,
  isConfig,
  setIsConfig,
}) => {
  const [size, setSize] = useState(hp(0.5))
  const [dataIni, setDataIni] = useState([])
  const [isVisible, setIsVisible] = useState(false)

  const save = d => {
    console.log(document);
    changeStatus({
      data: d,
      idUser: idUser,
      document: document,
    })
  }

  const isUndo = () => {
    canvas.undo()
    save(canvas.getPaths())
    setIsUndoActions(false)
  }

  return (
    <View style={styles.container}>
      {isUndoActions && isUndo()}
      {isConfig && edit && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#EBEBEB",
            width: 100,
            height: 122,
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            position: "absolute",
            top: 10,
            zIndex: 1,
          }}>
          <View style={{alignItems: "center", justifyContent: "center"}}>
            <Text style={{fontSize: 20, fontWeight: "400"}}>Stroke</Text>
            <Slider
              value={size}
              onValueChange={value => {
               console.log('value', value)
               setSize(value)}}
              minimumValue={hp(0.5)}
              maximumValue={hp(2)}
              style={{height: 20}}
              trackStyle={{backgroundColor: "#000", width: 70, height: 2}}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#000"
              thumbStyle={{height: 13, width: 13, backgroundColor: "#000"}}
            />
          </View>
          {!isActiveEraser && (
            <View>
              <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                <Text
                  style={{fontSize: 20, fontWeight: "400", marginVertical: 5}}>
                  Color
                </Text>
                <View
                  style={{
                    marginLeft: 10,
                    backgroundColor: color,
                    width: 29,
                    height: 29,
                    borderRadius: 50,
                  }}
                />
              </TouchableOpacity>

              <Overlay
                isVisible={isVisible}
                onBackdropPress={() => setIsVisible(!isVisible)}
                overlayStyle={{borderRadius: 10}}>
                <View style={{flexDirection: "row"}}>
                  <TouchableOpacity
                    onPress={() => {
                      isActiveMarker
                        ? setColor("#fff5016e")
                        : setColor("#FFF500")
                      setIsConfig(!isConfig)
                      setIsVisible(!isVisible)
                    }}>
                    <View
                      style={{
                        marginHorizontal: 10,
                        backgroundColor: "#FFF500",
                        width: 29,
                        height: 29,
                        borderRadius: 50,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      isActiveMarker
                        ? setColor("#ff01016e")
                        : setColor("#ff0000")
                      setIsConfig(!isConfig)
                      setIsVisible(!isVisible)
                    }}>
                    <View
                      style={{
                        marginHorizontal: 10,
                        backgroundColor: "#ff0000",
                        width: 29,
                        height: 29,
                        borderRadius: 50,
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      isActiveMarker
                        ? setColor("#0000006e")
                        : setColor("#000000")
                      setIsConfig(!isConfig)
                      setIsVisible(!isVisible)
                    }}>
                    <View
                      style={{
                        marginHorizontal: 10,
                        backgroundColor: "#000000",
                        width: 29,
                        height: 29,
                        borderRadius: 50,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </Overlay>
            </View>
          )}
        </View>
      )}

      <View style={{flex: 1, flexDirection: "row"}}>
        <View style={{flex: 1, flexDirection: "column"}}>
          {data !== null && (
            <SketchCanvas
              onLayout={{ width: 1024, height: 1164}}
              touchEnabled={edit}
              _pathsToProcess={data}
              focusable={true}
              ref={ref => (canvas = ref)}
              style={{flex: 1}}
              strokeColor={color}
              strokeWidth={size}
              onStrokeStart={(x, y) => {
                isConfig && setIsConfig(false)
                //  console.log('x: ', x, ', y: ', y)
                //  setState({ message: 'Start' })
              }}
              onStrokeChanged={(x, y) => {
                //  console.log('x: ', x, ', y: ', y)
                //  setState({ message: 'Changed' })
              }}
              onStrokeEnd={(e) => {
                // console.log('onStrokeEnd', e)
                save(canvas.getPaths())
                console.log('canvas.getPaths()', canvas.getPaths());
                //  setState({ message: 'End' })
              }}
              onPathsChange={pathsCount => {
                //  console.log('pathsCount', pathsCount)
              }}
            />
          )}
          {!edit && (
            <>
              <TouchableOpacity
                onPress={() => movePage("back")}
                style={styles.back}
              />
              <TouchableOpacity
                onPress={() => movePage("next")}
                style={styles.next}
              />
            </>
          )}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  barOptions: {
    marginVertical: 10,
    width: 213,
    height: 30,
    backgroundColor: "#F2F2F2",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 10,
    zIndex: 1,
  },
  iconLeft: {
    marginRight: 10,
  },
  strokeColorButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  strokeWidthButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#39579A",
  },
  functionButton: {
    marginHorizontal: 2.5,
    marginVertical: 8,
    height: 30,
    width: 60,
    backgroundColor: "#39579A",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    alignSelf: "stretch",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20,
  },
  page: {
    flex: 1,
    height: 300,
    elevation: 2,
    marginVertical: 8,
    backgroundColor: "white",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.75,
    shadowRadius: 2,
  },
  back: {
    flex: 1,
    width: 100,
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    // backgroundColor: "red",
  },
  next: {
    flex: 1,
    width: 100,
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 0,
    // backgroundColor: "blue",
  },
})

export default Canvas
