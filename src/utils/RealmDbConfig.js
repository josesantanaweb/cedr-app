import Realm from 'realm'

export const UserSchema = {
  name: 'User',
  properties: {
    idUser: 'string',
    annotations: 'Annotation[]',
  },
}

export const AnnotationSchema = {
  name: 'Annotation',
  properties: {
    id: 'int',
    page: 'string',
    txt: 'string',
  },
}

// const realm = await Realm.open({
//   schema: [Cat],
// })

// Realm.open({schema: [UserSchema, AnnotationSchema]})
//   .then(db => {
//     db.write(() => {
//       const ann = db.create('Annotation', {
//         id: 1,
//         page: '12',
//         txt: 'test1',
//       })
//       console.log('created');
//     })
//   })
