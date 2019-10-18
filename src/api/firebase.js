const firebase = require('firebase/app')
require('firebase/firestore')

const firebaseConfig = {
  apiKey: 'AIzaSyCfqFnOg1AeggkuyQUC9T76zjl2S4aPuSI',
  authDomain: 'balapanngetik.firebaseapp.com',
  databaseURL: 'https://balapanngetik.firebaseio.com',
  projectId: 'balapanngetik',
  storageBucket: 'balapanngetik.appspot.com',
  messagingSenderId: '127225675511',
  appId: '1:127225675511:web:b19e36aeffa54eee7d9df2'
}

firebase.initializeApp(firebaseConfig)

var db = firebase.firestore()

const increment = firebase.firestore.FieldValue.increment(1)

module.exports = { db, increment }
