import Vue from 'vue'
import Vuex from 'vuex'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    text: "Just at this juncture the boy felt a slow, fateful grip closing on his ear, and a steady lifting impulse. In that wise he was borne across the house and deposited in his own seat, under a peppering fire of giggles from the whole school. Then the master stood over him during a few awful moments, and finally moved away to his throne without saying a word. But although Tom's ear tingled, his heart was jubilant.",
    play: false,
    startCountdown: 5,
    gameCountdown: 20,
    username: ""
  },
  mutations: {
    playStart: function (state) {
      state.play = true
    },
    playEnd: function (state, wpm) {
      state.play = false
      Swal.fire({
        type: 'Done!',
        title: 'Great....!',
        text: 'Your wpm is ' + wpm.toFixed(0),
        footer: '<a href="/">Home</a>'
      })
    },
    countdownToPlay: function (state) {
      state.startCountdown--
    },
    resetCountdownToPlay: function (state) {
      state.startCountdown = 5
    },
    countdownToEndGame: function (state) {
      console.log(state.play)
      console.log(`game countdown: ${state.gameCountdown}`)
      state.gameCountdown--
    },
    resetCountdownToGame: function (state) {
      state.gameCountdown = 20
    },
    createUsername: function (state, name) {
      console.log('fadil')
      state.username = name
    }
  },
  actions: {
  },
  modules: {
  }
})
