import Realm from "realm";

const UserSchema = {
  name: "User",
  properties: {
    idUser: 'string',
    annotations: 'Annotation[]'
  },
};

const AnnotationSchema = {
  name: "Annotation",
  properties: {
    id: 'string',
    partitura: 'string',
    page: 'int',
    autor: 'string',
    status: 'string',
    notes: 'Notes[]',
    draw: 'Draw[]'
  }
};

const Notes = {
  name: "Notes",
  properties: {
    id: 'string',
    txt: 'string',
  },
}

const Path = {
  name: 'Path',
  properties :{
    id: 'int',
    color: 'string',
    width: 'int',
    data: 'string[]'
  }
}

const Size = {
  name: 'Size',
  properties :{
    width: 'int',
    height: 'int'
  }
}

const DataPath = {
  name: 'DataPath',
  properties :{
    data: 'string[]'
  }
}
const DataType = {
  name: 'DataType',
  properties :{
    data: 'string'
  }
}

const Draw = {
  name: "Draw",
  properties: {
    path: 'Path',
    size: 'Size',
    drawer: 'string?',
    status: 'bool'
  }
}

const Schemas = [
  UserSchema,
  AnnotationSchema,
  Draw,
  Path,
  DataPath,
  Size,
  DataType,
  Notes
];

export const addAnnotation = async(d) => {
  const {document, idUser} = d
  const realm = await Realm.open({
    path: "cedroLocalTest",
    schema: Schemas,
  });

  let data = realm.objects('User')

  if(data.length === 0){
       realm.write(() => {
         let add = realm.create("User", {
           idUser: idUser,
         })
         add.annotations.push({
           id: document.id,
           partitura: document.partitura,
           page: document.page,
           autor: document.autor,
           status: document.status,
           notes: [{
             id: document.idNote,
             txt: document.notes
           }]
         })
       })
  }else{
    realm.write(() => {
      data.map(d => {
          d.annotations.push({
          id: document.id,
          partitura: document.partitura,
          page: document.page,
          autor: document.autor,
          status: document.status,
          notes: [{
            id: document.idNote,
            txt: document.notes
          }]
        })
      })
    })
  }
}

export const changeStatus = async(d) => {
  const dataDraw = d.data
  const idUser = d.idUser
  const document = d.document

  const realm = await Realm.open({
    path: "cedroLocalTest",
    schema: Schemas,
  });
  const data = realm.objects('User')

  try {
    if(data.length === 0){
      realm.write(() => {
        let add = realm.create("User", {
          idUser: idUser,
        })
        dataDraw.map(draw => {
          add.annotations.push({
            id: document.id,
            partitura: document.partitura,
            page: document.page,
            autor: document.autor,
            status: document.status,
            draw: [{
              path: draw.path,
              size: draw.size,
              drawer: draw.drawer,
              status: true
            }]
          })
        })
      })
    }

    if(data.length > 0){
      data.map(db => {
        if(db.idUser === idUser){
          let parserDocument = db.annotations.filter(item => item.id === document.id)
          let parserPage = parserDocument.filter(item => item.page === document.page)

          if(parserDocument.length > 0){
            if(parserPage.length > 0){
              realm.write(() => {
                parserPage.map(d => {
                  d.draw.map(dd => {
                    dd.status = false
                  })
                })
              })
  
              realm.write(() => {
                dataDraw.map(draw => {
                  parserPage.map(d => {
                    d.draw.push({
                      path : draw.path,
                      size : draw.size,
                      drawer : draw.drawer,
                      status : true
                    })
                  }) 
                })
              })
            }else{
              realm.write(() => {
                dataDraw.map(draw => {
                  db.annotations.push({
                    id: document.id,
                    partitura: document.partitura,
                    page: document.page,
                    autor: document.autor,
                    status: document.status,
                    draw: [{
                      path: draw.path,
                      size: draw.size,
                      drawer: draw.drawer,
                      status: true
                    }]
                  })
                })
              })
            }
          }else{
            realm.write(() => {
              dataDraw.map(draw => {
                db.annotations.push({
                  id: document.id,
                  partitura: document.partitura,
                  page: document.page,
                  autor: document.autor,
                  status: document.status,
                  draw: [{
                    path: draw.path,
                    size: draw.size,
                    drawer: draw.drawer,
                    status: true
                  }]
                })
              })
            })
          }
        }else{
          realm.write(() => {
            let add = realm.create("User", {
              idUser: idUser,
            })
            dataDraw.map(draw => {
              add.annotations.push({
                id: document.id,
                partitura: document.partitura,
                page: document.page,
                autor: document.autor,
                status: document.status,
                draw: [{
                  path: draw.path,
                  size: draw.size,
                  drawer: draw.drawer,
                  status: true
                }]
              })
            })
          })
        }
      })
    }

  } catch (error) {
    console.log('error changeStatus', error);
  }
}

export const addDraw = async(addData) => {
  const {data} = addData
  let add
  const realm = await Realm.open({
    path: "cedroLocalTest",
    schema: Schemas,
  });

  try {
    data && data.map(d => {
      realm.write(() => {
        add = realm.create("Draw", {
        path: d.path,
        size: d.size,
        drawer: d.drawer,
        status: true
        });
      })
    })

  } catch (error) {
    console.log('error addDraw', error);
  }
}

export const getAnnotation = async() => {
  const realm = await Realm.open({
    path: "cedroLocalTest",
    schema: Schemas,
  });

  const notes = realm.objects("Annotation");
  return notes
}

export const getDraw = async({idUser, page, id}) => {
  const realm = await Realm.open({
    path: "cedroLocalTest",
    schema: Schemas,
  });

  const notes = realm.objects("User");
  let notesActive

  notes.map((d) => {
    if(idUser === d.idUser){
      let documentToEqual = d.annotations.filter((item) => item.id === id)
      let parserPage = documentToEqual.filter((item) => item.page === page)

      parserPage && parserPage.map((d) => {
        notesActive =  d.draw.filter((item) => item.status === true)
      })

      d.annotations.map(dd => {
        let deleteNotes = dd.draw.filtered("status = false")
        realm.write(() => {
           realm.delete(deleteNotes)
        })
      })
    }
  })

  // const [{annotations}] = notes
  // console.log('notesActive', JSON.stringify(notes));
  
  return notesActive
}