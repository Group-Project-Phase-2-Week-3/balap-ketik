<template>
<div>
  <p>Anda bisa bermain game</p>
  <button @click.prevent="playNow()">play</button>
  <button @click.prevent="finishPlay()">finish</button>
</div>
</template>

<script>
import { db, increment } from '../api/firebase'
import { access } from 'fs'
const firebase = require('firebase/app')
// require('firebase/firestore')
const dbtest = db.collection('tesuji');
const dbtestplay = db.collection('testplay');
const wpmdata = db.collection('wpmdata')

export default {
  methods: {
    playNow(){
      console.log('tombol play di click');
      dbtestplay.doc('bvHKUAFUhEW3RjzHsyTd').update({play:true})
    },
    finishPlay(){
      console.log("Permainan selesai")
      dbtestplay.doc('bvHKUAFUhEW3RjzHsyTd').update({play:false})
      .then(() => {
        return dbtest.doc('fXrCkZeVk1MzCvd7Dg2A').update({ counter: 0 })
      })
      .then(() => {
        return wpmdata.doc('kR4Iem0Ow2SLhz1GWqBm').update({
          wpm:firebase.firestore.FieldValue.arrayUnion(8) // Masukkan angka dengan jumla
        })  
      })
      .then(()=>{
        console.log("update selesai")
      })
      .catch(err => {
        console.log("data")
        console.log(err)
      })

      wpmdata.doc('kR4Iem0Ow2SLhz1GWqBm').onSnapshot((doc) => {
        console.log(doc)
        console.log(doc.data().wpm)
      })

    }
  }
}
</script>

<style>

</style>