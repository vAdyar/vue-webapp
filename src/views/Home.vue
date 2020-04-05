<template>
  <div class="home">
    <Header/>
    {{ this.index }}
    <br/>
    {{ this.results.correct }} / {{ this.results.total }}
    <br/>
    <v-btn small @click.prevent=resetQuestion>Reset</v-btn>
    <Card v-if="this.index < 10 && results.active" :cue=results.active v-on:next="doSomething($event)"/>
    
    <v-card
    class="mx-auto"
    max-width="344"
    v-else
  >
    <v-card-text>
      <div>Thank you</div>
      <p class="display-1 text--primary">
        That's all folks!
      </p>
    </v-card-text>
  </v-card>

    <div>
      <v-btn small @click.prevent="previousQuestion()" :disabled="this.index == 0">Previous</v-btn>
      <v-btn small @click.prevent="nextQuestion()" :disabled="this.index == 10">Next</v-btn>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'
import Header from '@/components/Header.vue'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Card,
    Header
  },
  data: function() {
    return {
      results: {
        active: {},
        correct: 0,
        total: 10
      }
    }
  },
  methods: {
    ...mapMutations([
      'changeIndex',
      'storeQuestions'
    ]),
    ...mapGetters([
      'getQuestionById'
    ]),
    doSomething: function(event) {
      if( event ) {
        this.results.correct++;
      }
      this.nextQuestion();
    },
    fetchQuestion: function() {
      fetch('https://opentdb.com/api.php?amount=10')
      .then(res => res.json())
      .then(json =>  {
        this.results.active = this.getAllOptions(json.results[0]);
        this.storeQuestions(json.results)
       console.log(this.getQ);
        });
    },
    resetQuestion() {
      this.changeIndex(-this.index)
      this.results.active = this.getAllOptions(this.questions[this.index]);
    },
    nextQuestion() {
      this.changeIndex(1)
      this.results.active = this.getAllOptions(this.questions[this.index]);
    },
    previousQuestion() {
      this.changeIndex(-1)
      this.results.active = this.getAllOptions(this.questions[this.index]);
    },
    getAllOptions(item) {
      let ret = item;
      let options = [...item.incorrect_answers , item.correct_answer];
      ret.options = this.shuffle(options);
      return ret;
    },
    shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
    }
  },
  computed: {
    ...mapState([
      'index',
      'questions'
    ]),
    getQ() {
       return this.$store.getters.getQuestionById(this.index)
    }
  },
  beforeMount: function() {
    this.fetchQuestion();
  }
}
</script>
