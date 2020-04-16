import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    index: 0,
    correct: 0,
    total: 10,
    questions: [],
    user: {
      loggedIn: false,
      data: null
    }

  },
  getters: {
    user(state){
      return state.user
    },
    getQuestionById: state => index =>  { return state.questions[index] },
    getCorrect: state => { return state.correct },
    getIndex: state => {return state.index }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    changeIndex(state, val) {
      state.index += val;
    },
    SET_QUESTIONS(state, items) {
      state.questions = items;
    },
    SET_INDEX(state, index) {
      state.index = index;
    },
    SET_CORRECT(state, correct) {
      state.correct = correct;
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },
    setQuestions(context) {
      let ret_cue = [];
      Vue.http.get('https://opentdb.com/api.php?amount=10')
      .then(res => res.json())
      .then(json =>  {
          for(let k=0; k<json.results.length; k++) {
          ret_cue[k] = json.results[k];
          let a = [...json.results[k].incorrect_answers, json.results[k].correct_answer];
          for (let i = a.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [a[i], a[j]] = [a[j], a[i]];
          }
          ret_cue[k].options = a;
          ret_cue[k].id = k;
      }
      });
      
      context.commit('SET_QUESTIONS', ret_cue);
  },
  setCorrect(context, correct) {
    context.commit('SET_CORRECT', correct);
  },
  setIndex(context, index) {
    context.commit('SET_INDEX', index);
  }
  },
  modules: {
  }
})
