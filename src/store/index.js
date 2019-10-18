import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter : 0,
    play: false
  },
  mutations: {
    changeCounter(params){
      this.counter = params
    },
    changePlay(params){
      this.play = params
    }
  },
  actions: {
  },
  modules: {
  }
})
