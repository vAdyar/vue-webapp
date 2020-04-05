import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    index: 0,
    questions: [],
    dummy: ""
  },
  getters: {
    getQuestionById: state => index =>  { return state.questions[index] }
  },
  mutations: {
    changeIndex(state, val) {
      state.index += val;
    },
    storeQuestions(state, items) {
      state.questions = items;
    }
  },
  actions: {
  },
  modules: {
  }
})
