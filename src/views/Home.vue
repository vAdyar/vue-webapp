<template>
  <div class="home">
            <div v-if="user.loggedIn" class="alert alert-success" role="alert">
            
          </div>
    {{ this.correct }} / {{ this.total }}
    <br/>
    <v-btn small @click.prevent=resetQuestion>Reset</v-btn>
    <Card v-if="this.index < 10" :index=this.index />
    
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
      <!-- <v-btn small @click.prevent="previousQuestion()" :disabled="this.index <= 0">&lt; Previous</v-btn> -->
      <v-btn small @click.prevent="nextQuestion()" :disabled="this.index >= 10">Next &gt;</v-btn>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'
import { mapState, mapActions } from 'vuex'
import { mapMutations } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Card
  },
  data: function() {
    return {
      
    }
  },
  methods: {
    ...mapMutations([
      'changeIndex',
      'storeQuestions'
    ]),
    ...mapActions([
      'setQuestions', 'setCorrect'
    ]),
    resetQuestion() {
      this.setCorrect(0);
      this.changeIndex(-this.index)
    },
    nextQuestion() {
      this.changeIndex(1)
    },
    previousQuestion() {
      this.changeIndex(-1)
    },
  },
  computed: {
    ...mapState([
      'index' , 'correct', 'total', 'questions'
    ]),
    ...mapGetters([
      'getQuestionById', 'user' , 'getCorrect'
    ]),
  },
  beforeMount() {
    this.$store.dispatch('setQuestions')
  }
}
</script>
