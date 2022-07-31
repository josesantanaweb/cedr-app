// /Users/ribarras/Documents/projects/dev/cedro/new/cedro/node_modules/@lighthouse/react-native-sketch-canvas/src/SketchCanvas.js
// in line 83
// this._pathsToProcess = props._pathsToProcess ? props._pathsToProcess : []

import React, {useState, useEffect, useRef} from "react"
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
  Animated,
  PanResponder
} from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {Dirs, FileSystem} from "react-native-file-access"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { PdfUtil, PdfView as PdfV, Pdf} from "react-native-pdf-light"
import {Badge, Overlay} from "react-native-elements"
import DeviceInfo from "react-native-device-info"
import Annotations from "./Annotations"
import Canvas from "./Canvas"
import {addAnnotation, getAnnotation, getDraw} from "../../utils/RealmDb"
import pencil from "../../assets/img/Pencil.png"
import hightlighter from "../../assets/img/Hightlighter.png"
import eraser from "../../assets/img/eraser.png"
import activePencil from "../../assets/img/activePencil.png"
import activeHightlighter from "../../assets/img/activeHightlighter.png"
import activeEraser from "../../assets/img/activeEraser.png"
import undo from "../../assets/img/Undo.png"
import anotaciones from "../../assets/img/Anotaciones.png"
import ok from "../../assets/img/ok.png"
import search from "../../assets/img/search.png"
import {decode as atob, encode as btoa} from "base-64"
const RNFS = require("react-native-fs")

const PdfView = props => {
  const pan = useRef(new Animated.ValueXY()).current
  const [pageData, setPageData] = useState([])
  const [fileDownloaded, setFileDownloaded] = useState(false)
  const [pdfBase64, setPdfBase64] = useState(null)
  const [pdfArrayBuffer, setPdfArrayBuffer] = useState(null)
  const [isConfig, setIsConfig] = useState(false)
  const [isMenuEdit, setIsMenuEdit] = useState(false)
  const [isUndoActions, setIsUndoActions] = useState(false)
  const [dataUser, setDataUser] = useState(null)
  const [dataText, setDataText] = useState([])
  const [isActivePen, setIsActivePen] = useState(false)
  const [isActiveMarker, setIsActiveMarker] = useState(false)
  const [isActiveEraser, setIsActiveEraser] = useState(false)
  const [color, setColor] = useState("#000000")
  const [edit, setEdit] = useState(false)
  const [txt, setTxt] = useState(null)
  const [isNote, setIsNote] = useState(false)
  const [isViewNote, setIsViewNote] = useState(false)
  const [currentNote, setCurrentNote] = useState(false)
  const [hideNotes, setHideNotes] = useState(false)
  const [isDraw, setIsDraw] = useState(false)
  const [page, setPage] = useState(0)
  const [numberOfPages, setNumberOfPages] = useState(null)
  const {navigation} = props
  const {params} = props.route
  const {item} = params
  const [dataDraw, setDataDraw] = useState([])
  const source = {uri: item.documents[0]?.pdf, cache: true}
  const validatePartitura = dataText.filter(d => d._id === item._id)
  const [pdfWidth, setPdfWidth] = useState('');
  const [pdfHeight, setPdfHeight] = useState('');
  const isCurrentPage = validatePartitura.filter(
    d => d.page === page && d.notes.length > 0
  )
  const [filePath, setFilePath] = useState(
    `${RNFS.DocumentDirectoryPath}/${item.documents.id}.pdf`
  )

  // const filePathJson = `${RNFS.DocumentDirectoryPath}/annotation.json`

  const isTablet = DeviceInfo.isTablet()

  const downloadFile = () => {
    RNFS.downloadFile({
      fromUrl: source.uri,
      toFile: filePath,
    }).promise.then(res => {
      setFileDownloaded(true)
      readFile()
    })
  }

  // const jsonParse = () => {
  //   RNFS.writeFile(filePathJson, JSON.stringify(annotatio), "utf8")
  //     .then(d => readFiles())
  //     .catch(e => console.log(e))
  // }

  const readFiles = () => {
    RNFS.readFile(filePathJson, "utf8")
      .then(contents => {
      })
      .catch(err => {
        console.log("contentsErrors", err.message, err.code)
      })
  }

  // const parserData = async () => {
  //   const data = ["327.33,149", "327.33,149.67", "327.33,151", "327.33,155.67", "327.33,164", "327.33,172.67", "327.33,181.67", "327.33,188.33", "327.33,193.33", "327.33,197.33"]
  //   const dataMap = []

  //   data.map(d => {
  //     const data = []
  //     const parse0 = parseFloat(d.split(',')[0])
  //     const parse1 = parseFloat(d.split(',')[1])
  //     const conca = data.concat(parse0, parse1)
  //     dataMap.push(conca)
  //   })
  // }

  const pageParse = async () => {
    const dataV = []
    const dataPar = []
    const sizePdf = await PdfUtil.getPageSizes(filePath)
    const dataP = await PdfUtil.getPageCount(filePath)

    setPdfWidth(sizePdf[0].width)
    setPdfHeight(sizePdf[0].height)
    
    sizePdf.map((d, i ) => {
      dataPar.push({
        page: i + 1,
        width: d.width,
        height: d.height,
      })
    })

    dataV.push({
      url: filePath,
      pages: dataP,
      detail: dataPar
    })

    setPageData(dataV)
    setNumberOfPages(dataP)
  }

  const base64ToArrayBuffer = base64 => {
    const binary_string = atob(base64)
    const len = binary_string.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i)
    }
    return bytes.buffer
  }

  const readFile = () => {
    RNFS.readFile(
      `${RNFS.DocumentDirectoryPath}/${item.documents.id}.pdf`,
      "base64"
    ).then(contents => {
      setPdfBase64(contents)
      setPdfArrayBuffer(base64ToArrayBuffer(contents))
    })
  }

  const getDataLocal = async () => {
    const notes = await getAnnotation()
    notes && setDataText(notes)
  }

  const getDataUser = async () => {
    const data = await AsyncStorage.getItem("dataUser")
    const dataObject = await JSON.parse(data)
    setDataUser(dataObject)

    const dataD =
      page >= 0 &&
      (await getDraw({
        idUser: dataObject.user.id,
        page: page,
        id: item.id,
      }))
    setDataDraw(dataD)
    setIsDraw(true)
  }

  const isVisible = () => {
    setIsNote(!isNote)
  }

  const showAllNote = () => {
    if (dataText.length > 0) {
      setIsViewNote(!isViewNote)
      setHideNotes(!hideNotes)
      setCurrentNote(false)
    } else {
      Alert.alert(
        "No hay comentarios",
        "Debe agregar comentarios, para poder visualizarlos"
      )
    }
  }

  const parserShowAllNote = () => {
    return (
      <Annotations
        setIsDraw={setIsDraw}
        idPartitura={item._id}
        hide={hide}
        setPage={setPage}
        data={dataText}
      />
    )
  }

  const showCurrentNote = () => {
    setCurrentNote(!currentNote)
    setHideNotes(!hideNotes)
    setIsViewNote(false)
  }
  const parserCurrentNote = () => {
    return (
      <Annotations
        setIsDraw={setIsDraw}
        idPartitura={item._id}
        hide={hide}
        setPage={setPage}
        data={isCurrentPage}
      />
    )
  }

  const hide = () => {
    setHideNotes(false)
    setIsViewNote(false)
    setCurrentNote(false)
  }

  const save = () => {
    if (txt) {
      setDataText(dataText => [
        ...dataText,
        {page: page, txt: txt, id: page + txt},
      ])
      addAnnotation({
        isNote: true,
        idUser: dataUser.user.id,
        document: {
          page: page,
          notes: txt,
          id: item.id,
          partitura: item.title,
          idNote: page + txt,
          autor: "test",
          status: "buyed",
        },
      })
      setTxt(null)
      setIsNote(false)
    } else {
      alert("Debe agregar una nota")
    }
  }

  const movePage = move => {
    if (move === "back" && page > 0) {
      setPage(p => p - 1)
      setIsDraw(false)
    }
    if (move === "next" && page < numberOfPages - 1) {
      setPage(p => p + 1)
      setIsDraw(false)
    }
  }

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          // x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          // { dx: pan.x, dy: pan.y }
          { dy: pan.y }
        ],
        {useNativeDriver: false}
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

  useEffect(() => {
    downloadFile()
    // parserData()
  }, [])

  useEffect(() => {
    pageParse()
  }, [fileDownloaded])

  useEffect(() => {
    getDataUser()
    getDataLocal()
    console.log('page', page);
  }, [page])

  return (
    <View style={[styles.container, { marginTop: !isTablet && -20 }]}>
      <Animated.View
        style={{
          transform: [{ translateY: pan.y }], 
          backgroundColor: "#EBEBEB",
          width: !isMenuEdit ? 55 : '100%' ,
          height: 55,
          borderRadius: 50,
          position: "absolute",
          top: 40,
          right: !isMenuEdit && 20,
          zIndex: 2,
        }}
        {...panResponder.panHandlers}
      >
        {!isMenuEdit ? (
          <TouchableOpacity
            style={{

            }}
            onPress={() => setIsMenuEdit(true)}>
            <View style={{justifyContent: "center", alignItems: "center"}}>
              <Image
                source={pencil}
                style={{width: 22, height: 22, marginTop: 15}}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={!isTablet ? styles.menuHeader : styles.menuHeaderTable}>
            <TouchableOpacity
              onPress={() => {
                isMenuEdit && isActivePen && setIsConfig(!isConfig)
                color === "#00000000" && setColor("#000000")
                color !== "#00000000" && color.length > 7 && setColor("#000000")
                setIsActivePen(true)
                setEdit(true)
                setIsActiveEraser(false)
                setIsActiveMarker(false)
              }}>
              {isActivePen ? (
                <Image
                  source={activePencil}
                  style={[
                    {
                      width: 22,
                      height: 22,
                      tintColor: color && color !== "#00000000" && color,
                    },
                    styles.imgTable,
                  ]}
                />
              ) : (
                <Image
                  source={pencil}
                  style={[{width: 22, height: 22}, styles.imgTable]}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                isMenuEdit && isActiveMarker && setIsConfig(!isConfig)
                color === "#00000000" && setColor("#fff5016e")
                color !== "#00000000" &&
                  color.length <= 7 &&
                  setColor("#fff5016e")
                setIsActiveMarker(true)
                setEdit(true)
                setIsActiveEraser(false)
                setIsActivePen(false)
              }}>
              {isActiveMarker ? (
                <Image
                  source={activeHightlighter}
                  style={[
                    {
                      width: 23.1,
                      height: 22,
                      tintColor: color && color !== "#00000000" && color,
                    },
                    styles.imgTable,
                  ]}
                />
              ) : (
                <Image
                  source={hightlighter}
                  style={[{width: 23.1, height: 22}, styles.imgTable]}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                isMenuEdit && isActiveEraser && setIsConfig(!isConfig)
                setColor("#00000000")
                setIsActiveEraser(true)
                setEdit(true)
                setIsActiveMarker(false)
                setIsActivePen(false)
              }}>
              {isActiveEraser ? (
                <Image
                  source={activeEraser}
                  style={[{width: 25.3, height: 22}, styles.imgTable]}
                />
              ) : (
                <Image
                  source={eraser}
                  style={[{width: 25.3, height: 22}, styles.imgTable]}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsUndoActions(true)
              }}>
              <Image
                source={undo}
                style={[{width: 22, height: 22}, styles.imgTable]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsMenuEdit(false)
                setEdit(false)
              }}>
              <Image
                source={ok}
                style={[{width: 33, height: 22}, styles.imgTable]}
              />
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>

      {isViewNote && <View style={styles.viewNote}>{parserShowAllNote()}</View>}

      {currentNote && (
        <View style={styles.viewNote}>{parserCurrentNote()}</View>
      )}

      {fileDownloaded &&  (
        <PdfV
          style={{
            position: "absolute",
            top: 0,
            bottom: 200, 
            left: 0,
            right: 0,
            padding: 10, 
            height: hp('100%'),
          }}
          page={page}
          resizeMode="contain"
          source={filePath}
        />
      )}

      {isDraw && (
        isTablet ? (
          <View style={styles.drawTable}>
          <Canvas
            isUndoActions={isUndoActions}
            setIsUndoActions={setIsUndoActions}
            color={color}
            setColor={setColor}
            isActiveEraser={isActiveEraser}
            isActiveMarker={isActiveMarker}
            isActivePen={isActivePen}
            movePage={movePage}
            data={dataDraw}
            edit={edit}
            setEdit={setEdit}
            idUser={dataUser && dataUser.user.id}
            isConfig={isConfig}
            setIsConfig={setIsConfig}
            document={{
              page: page,
              id: item.id,
              partitura: item.title,
              autor: "test",
              status: "buyed",
            }}
          />
        </View>
        ):
          Platform.OS === "ios" ?
        (
          <View style={styles.draw}>
            <Canvas
              isUndoActions={isUndoActions}
              setIsUndoActions={setIsUndoActions}
              color={color}
              setColor={setColor}
              isActiveEraser={isActiveEraser}
              isActiveMarker={isActiveMarker}
              isActivePen={isActivePen}
              movePage={movePage}
              data={dataDraw}
              edit={edit}
              setEdit={setEdit}
              idUser={dataUser && dataUser.user.id}
              isConfig={isConfig}
              setIsConfig={setIsConfig}
              document={{
                page: page,
                id: item.id,
                partitura: item.title,
                autor: "test",
                status: "buyed",
              }}
            />
          </View>
        )
         : 
        (
          <View style={styles.drawAndroid}>
            <Canvas
              isUndoActions={isUndoActions}
              setIsUndoActions={setIsUndoActions}
              color={color}
              setColor={setColor}
              isActiveEraser={isActiveEraser}
              isActiveMarker={isActiveMarker}
              isActivePen={isActivePen}
              movePage={movePage}
              data={dataDraw}
              edit={edit}
              setEdit={setEdit}
              idUser={dataUser && dataUser.user.id}
              isConfig={isConfig}
              setIsConfig={setIsConfig}
              document={{
                page: page,
                id: item.id,
                partitura: item.title,
                autor: "test",
                status: "buyed",
              }}
            />
          </View>
        )
      )}

      <Overlay
        isVisible={isNote}
        onBackdropPress={() => setIsNote(!isNote)}
        overlayStyle={{borderRadius: 10, width: "90%", height: "50%"}}>
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
              paddingHorizontal: 21,
              top: 26,
            }}>
            <Text>Crear nota</Text>
            <TouchableOpacity onPress={() => setIsNote(!isNote)}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                }}>
                X
              </Text>
            </TouchableOpacity>
          </View>
          {isNote && (
            <TextInput
              style={styles.input}
              multiline
              placeholder="Agregar nota"
              onChange={e => setTxt(e.nativeEvent.text)}
            />
          )}
          {isNote && txt !== null && txt !== "" && (
            <TouchableOpacity style={styles.button} onPress={save}>
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          )}
        </View>
      </Overlay>

      {!isDraw && (
        <>
          <TouchableOpacity
            style={styles.next}
            onPress={() => movePage("back")}
          />
          <TouchableOpacity
            style={styles.back}
            onPress={() => movePage("next")}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor:'white',
  },
  menuHeader: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#EBEBEB",
  },
  menuHeaderTable: {
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  imgTable: {
    marginHorizontal: 20,
  },
  viewNote: {
    position: "absolute",
    top: "6%",
    left: "0%",
    right: "40%",
    bottom: "12%",
    zIndex: 2,
  },
  pdf: {
    flex: 1,
    width: wp('100%'),
    backgroundColor: "#fff",
  },
  pdfTable:{
    width: wp('100%'),
    height: hp('90%'),
    backgroundColor: "#fff",
  },
  input: {
    width: 294,
    height: 220,
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
    color: "#000",
    textAlign: "center",
    marginTop: 71,
  },
  button: {
    backgroundColor: "#134FB1",
    width: 282,
    height: 47,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 27,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  badgeContainer: {
    zIndex: 2,
    position: "absolute",
    top: 5,
    left: 5,
  },
  badge: {
    width: 30,
    height: 30,
    borderRadius: 100,
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
  draw: {
    flex: 1,
    top: hp('19.7%'),
    flexDirection: "row",
    zIndex: 1,
    position: "absolute",
    width: wp('100%'),
    height: hp('59.2%'),
  },
  drawAndroid: {
    flex: 1,
    top: hp('7.5'),
    flexDirection: "row",
    zIndex: 1,
    position: "absolute",
    width: wp('100%'),
    height: hp('64%'),
  },
  drawTable: {
    flex: 1,
    top: hp('1%'),
    flexDirection: "row",
    zIndex: 1,
    position: "absolute",
    width: wp('100%'),
    height: hp('96%'),
  },
})

export default PdfView