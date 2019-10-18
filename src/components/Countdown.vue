<template>
  <div>
    <div class="start-countdown-container">
      <p>{{startCountdown}}</p>
    </div>
    <div v-if="!startCountdown" class="game-countdown-container">
      <p>{{gameCountdown}}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations([
      'playStart',
      'playEnd',
      'countdownToPlay',
      'resetCountdownToPlay',
      'countdownToEndGame',
      'resetCountdownToGame'
    ])
  },
  computed: mapState(['play', 'startCountdown', 'gameCountdown']),
  watch: {
    play: function (newPlayStatus, oldPlayStatus) {
      if (newPlayStatus === true) {
        console.log('play start')
        let timerId = setInterval(() => this.countdownToPlay(), 1000)
        setTimeout(() => {
          clearInterval(timerId)
          console.log('GO!!')
        }, 5000)
      } else {
        console.log('play end')
        this.resetCountdownToPlay()
        this.resetCountdownToGame()
      }
    },
    startCountdown: function (newCount, oldCount) {
      // console.log(`new count is ${newCount} + ${this.play}`)
      if (newCount === 0) {
        let timerId = setInterval(() => {
          this.countdownToEndGame()
          if (!this.play) {
            clearInterval(timerId)
            console.log('GAME FINISH!!')
          }
        }, 1000)
        setTimeout(() => {
          clearInterval(timerId)
          // this.playEnd()
          this.$emit('selesai')
          console.log('GAME FINISH!!')
        }, 20000)
      }
    }
  }
}
</script>

<style>
</style>
