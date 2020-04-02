<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Question</div>
      <p class="display-1 text--primary">
        {{ results[0].question }}
      </p>
      <p>adjective</p>
      <div class="text--primary">
        well meaning and kindly.<br>
        "a benevolent smile"
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
      >
        Learn More
      </v-btn>
    </v-card-actions>
  </v-card>
    <v-btn small @click="fetchQuestion()">Normal</v-btn>
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
      results: "Your question is:"
    }
  },
  methods: {
    fetchQuestion() {
      fetch('https://opentdb.com/api.php?amount=10')
      .then(res => res.json())
      .then(json => this.results = json.results);
    }
  } 
}
</script>
