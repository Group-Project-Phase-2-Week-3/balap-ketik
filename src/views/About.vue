<template>
  <div id="app">
    <p class="game-title">Uppppppsssss!</p>
    <p class="anounce-text">Anda kalah cepat! Room sudah penuh. Mohon tunggu...</p>
    <img alt="Vue logo" width="300px" height="300px" src="../assets/ups.png">
    <div>
      <b-button size="lg" class="mt-4 px-5" variant="secondary"><router-link class="play-text" to="/">HOME</router-link></b-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'about',
  components: {
  },
  data () {
    return {
      counter: 0,
      play: false
    }
  },
  created () {
    
  }

}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Faster+One|Fredoka+One&display=swap');
body{
  background-image: url('https://www.toptal.com/designers/subtlepatterns/patterns/skulls.png')
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 15vh;
}
.game-title{
  font-size: 70px;
  font-family: 'Faster One', cursive;
}
.play-text{
  color: #ffffff;
  font-size: 30px;
  font-family: 'Fredoka One', cursive;
}
.anounce-text{
  font-size: 30px;
  font-family: 'Fredoka One', cursive;
}
</style>