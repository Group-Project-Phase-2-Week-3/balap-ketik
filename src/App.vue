<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import { db, increment } from './api/firebase'
import { access } from 'fs'
const dbtest = db.collection('tesuji')
const dbtestplay = db.collection('testplay');

export default {
  created(){
    console.log("ini adalah halaman pertama kali dibuat");

    dbtest.doc('fXrCkZeVk1MzCvd7Dg2A').update({ counter: increment })
    .then(() => {
      var unsubscribe = dbtest.onSnapshot((doc) => {
        doc.docs.forEach(el => {
          console.log(el.data())
          if (el.data().counter > 30 && !localStorage.getItem('access')) {
            console.log(el.data().counter)
            console.log('counter sudah 30, sudah limit')
            this.counter = 30
            console.log(localStorage.getItem('access'))
            if(!localStorage.getItem('access')){
              console.log(localStorage.getItem('access'))
              unsubscribe();
            }
          }
          else if(el.data().counter < 31 || localStorage.getItem('access')){
            console.log(el.data().counter)
            console.log('access diberikan')
            localStorage.setItem('access', el.data().counter)

            console.log('kokoko');
            dbtestplay.onSnapshot((doc) => {
              console.log('dasdasdadas');
              doc.docs.forEach(el => {
                // nanti ini langsung dikirim ke store vuex untuk tanda play
                console.log(el.data());
              })
            })

          }
        })
      })
    });

    

  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
