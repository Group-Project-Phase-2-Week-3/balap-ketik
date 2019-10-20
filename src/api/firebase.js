const firebase = require('firebase/app')
require('firebase/firestore')

const firebaseConfig = {
  
}

firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()

const increment = firebase.firestore.FieldValue.increment(1)

module.exports = { db, increment }
