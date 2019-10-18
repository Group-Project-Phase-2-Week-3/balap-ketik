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
const dbtestplay = db.collection('testplay');

export default {
  methods: {
    playNow(){
      console.log('tombol play di click');
      dbtestplay.doc('bvHKUAFUhEW3RjzHsyTd').update({play:true})
    },
    finishPlay(){
      console.log("Permainan selesai")
    }
  }
}
</script>

<style>

</style>