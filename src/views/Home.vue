<template>
  <div class="home" @next="doSomething">
    
    {{ this.results.correct }} / {{ this.results.total }}
    <Card :cue="results.active" :index="results.index"/>

    <div>
      <v-btn small @click="previousQuestion()">Previous</v-btn>
      <v-btn small @click="nextQuestion()">Next</v-btn>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'

export default {
  name: 'Home',
  components: {
    Card,
  },
  data: function() {
    return {
      results: {
        questions: {},
        index: 0,
        active: "",
        correct: 0,
        total: 10,
        class_active: ""
      }
    }
  },
  methods: {
    doSomething(event, { isCorrect }) {
      console.log("DO something"+event)
    },
    fetchQuestion: function() {
      fetch('https://opentdb.com/api.php?amount=10')
      .then(res => res.json())
      .then(json =>  {
        this.results.questions = json.results;
        this.results.active = this.getAllOptions(json.results[0]);
        });
    },
    nextQuestion() {
      this.results.active = this.getAllOptions(this.results.questions[this.results.index++]);
      console.log("Next clicked!!!")
    },
    previousQuestion() {
      this.results.active = this.getAllOptions(this.results.questions[this.results.index--]);
    },
    getAllOptions(item) {
      let ret = item;
      let options = [...item.incorrect_answers , item.correct_answer];
      ret.options = this.shuffle(options);
      console.log(ret);
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
  beforeMount: function() {
    this.fetchQuestion();
  }
}
</script>
