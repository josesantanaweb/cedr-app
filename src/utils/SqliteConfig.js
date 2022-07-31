import {openDatabase} from 'react-native-sqlite-storage'

const db = openDatabase({
  name: 'cedroLocal',
})

export const createTables = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS userHistory (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          idUser VARCHAR(30),
          document BLOB
          )`,
      [],
      (tx, result) => {},
      error => {
        console.log('Error al crear la tabla', error.message)
      }
    )
  })
}

export const addUserHistory = props => {
  const {idUser, document} = props

  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO userHistory (idUser, document) VALUES (?, ?)',
      [idUser, document],
      (tx, result) => {
        getUserHistory().then(d => console.log(d))
      },
      error => {
        console.log('Error', error.message)
      }
    )
  })
}

export const getUserHistory = () =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM userHistory ORDER BY id DESC',
        [],
        (tx, result) => {
          let len = result.rows.length

          if (len > 0) {
            let data = []
            for (let i = 0; i < len; i++) {
              let item = result.rows.item(i)
              data.push({
                id: item.id,
                idUser: item.idUser,
                document: item.document,
              })
            }
            resolve(data)
          }
        },
        error => {
          console.log('error', error)
          reject(error)
        }
      )
    })
  })

export const deleteUserHistoryAll = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM userHistory',
      [],
      (tx, result) => {
        console.log('data eliminada')
        getUserHistory().then(d => console.log(d))
      },
      error => {
        console.log('Error', error.message)
      }
    )
  })
}
