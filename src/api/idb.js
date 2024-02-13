const DB_NAME = 'meansDb'
const STORAGE_NAME = 'means'
const DB_VERSION = '1'
let db = null

export default {
  getDb() {
    return new Promise((resolve, reject) => {
      if (db) {
        return resolve(db)
      }
      const DBOpenReq = window.indexedDB.open(DB_NAME, DB_VERSION)
      DBOpenReq.onerror = (e) => {
        console.log(e)
        reject(new Error('Error created DB'))
      }
      DBOpenReq.onsuccess = (e) => {
        db = e.target.result
        console.log('success opening DB')
        resolve(db)
      }
      DBOpenReq.onupgradeneeded = (e) => {
        db = e.target.result
        let oldVersion = e.oldVersion
        let newVersion = e.newVersion || db.version
        console.log(`DB updated from ${oldVersion} to ${newVersion}`)

        let objectStore = null
        if (!db.objectStoreNames.contains(STORAGE_NAME)) {
          objectStore = db.createObjectStore('means', {
            keyPath: 'id'
          })

          // add the indexes
          objectStore.createIndex('nameIDX', 'mean', { uniq: false })
        }
      }
    })
  },
  async getAllCards() {
    let db = await this.getDb()
    return new Promise((resolve) => {
      let tx = db.transaction([STORAGE_NAME], 'readonly')
      const store = tx.objectStore(STORAGE_NAME)
      let cards = []
      let getReq = store.getAll()
      getReq.onsuccess = (ev) => {
        let request = ev.target
        cards = request.result
      }
      getReq.onerror = (err) => {
        console.warn(err)
      }

      tx.oncomplete = () => {
        resolve(cards)
      }
    })
  },
  async addCard(card) {
    let db = await this.getDb()

    return new Promise((resolve) => {
      let tx = db.transaction([STORAGE_NAME], 'readwrite')
      tx.oncomplete = () => {
        resolve()
      }
      let store = tx.objectStore(STORAGE_NAME)
      let req = store.add(card)
      req.onsuccess = () => {
        console.log('Карточка добавлена')
      }
      req.onerror = (err) => {
        console.warn('Ошбика добавления карточки', err)
      }
    })
  },
  async updateCard(card) {
    let db = await this.getDb()
    return new Promise((resolve) => {
      let tx = db.transaction([STORAGE_NAME], 'readwrite')
      let store = tx.objectStore(STORAGE_NAME)
      let request = store.put(card)
      request.onsuccess = () => {
        console.log('Карточка обновлена')
      }
      request.onerror = (err) => {
        console.log('Ошибка обновления карточки', err)
      }
      tx.oncomplete = () => {
        resolve()
      }
    })
  },
  async deleteCard(cardId) {
    let db = await this.getDb()
    return new Promise((resolve) => {
      let tx = db.transaction([STORAGE_NAME], 'readwrite')
      let store = tx.objectStore(STORAGE_NAME)
      let request = store.delete(cardId)
      request.onsuccess = () => {
        console.log('Карточка удалена')
      }
      request.onerror = (err) => {
        console.warn('Ошибка удаления', err)
      }

      tx.oncomplete = () => {
        resolve()
      }
    })
  },
  deleteBD() {
    const DBDeleteRequest = window.indexedDB.deleteDatabase('meansDb')

    DBDeleteRequest.onerror = () => {
      console.error('Error deleting database.')
    }

    DBDeleteRequest.onsuccess = (event) => {
      console.log('Database deleted successfully')

      console.log(event.result) // should be undefined
    }
  }
}
