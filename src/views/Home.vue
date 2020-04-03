<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <p> {{results.active.category}} </p>
      <p class="display-1 text--primary">
        {{ results.active.question }}
      </p>
      <div class="text--primary">
        <v-list rounded>
          <v-list-item-group v-model="this.results.active.options" color="primary">
            <v-list-item
              v-for="(item, i) in this.results.active.options"
              :key="i" @click="answerClicked(item)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn small @click="previousQuestion()">Previous</v-btn>
      <v-btn small @click="nextQuestion()">Next</v-btn>
    </v-card-actions>
  </v-card>
    
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'

export default {
  name: 'Home',
  components: {
    Card
  },
  data: function() {
    return {
      results: {
        questions: {},
        index: 0,
        active: ""
      }
    }
  },
  methods: {
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
    },
    previousQuestion() {
      this.results.active = this.getAllOptions(this.results.questions[this.results.index--]);
    },
    answerClicked(index) {
      console.log(index + "clicked")
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
