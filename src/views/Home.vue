<template>
  <div class="home">
    {{ this.results.index }}
    <br/>
    {{ this.results.correct }} / {{ this.results.total }}
    <Card v-if="results.index < 5" :cue=results.active v-on:next="doSomething($event)"/>
    
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
      <v-btn small @click.prevent="previousQuestion()">Previous</v-btn>
      <v-btn small @click.prevent="nextQuestion()">Next</v-btn>
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
        active: {},
        correct: 0,
        total: 10,
        class_active: ""
      }
    }
  },
  methods: {
    doSomething: function(event) {
      console.log("dosomething")
      if( event ) {
        this.results.correct++;
      }
      this.nextQuestion();
    },
    fetchQuestion: function() {
      fetch('https://opentdb.com/api.php?amount=10')
      .then(res => res.json())
      .then(json =>  {
        this.results.questions = json.results;
        console.log(json.results)
        this.results.active = this.getAllOptions(json.results[0]);
        });
    },
    nextQuestion() {
      this.results.active = this.getAllOptions(this.results.questions[++this.results.index]);
      console.log(this.results.active.question)
    },
    previousQuestion() {
      this.results.active = this.getAllOptions(this.results.questions[--this.results.index]);
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
