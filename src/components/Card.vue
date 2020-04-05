<template>
  <v-card
    class="mx-auto"
    max-width="444"
  >
    <v-card-text v-if="this.$store.getters.getQuestionById(this.index)">
      <p> {{ this.$store.getters.getQuestionById(this.index).category }} </p>
      <p class="display-1 text--primary">
        {{ this.$store.getters.getQuestionById(this.index).question }}
      </p>
      <div class="text--primary">
        <v-list rounded>
          <v-list-item-group v-model="this.$store.getters.getQuestionById(this.index).options" color="primary">
            <v-list-item
              v-for="(item, i) in this.$store.getters.getQuestionById(this.index).options"
              :key="i" @click.prevent="answerClicked(item)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    component: {
        name: "Card"
    },
    data: function() {
        return {
            card: {
                isCorrect: false
            }
        }
    },  
    props: {
        index: Number
    },
    methods: {
        ...mapGetters([
          'getQuestionById'
        ]),
        answerClicked(item) {
          console.log("item: "+item)
          let answer = this.$store.getters.getQuestionById(this.index).correct_answer;
            if(answer === item) {
                this.card.isCorrect = true;       
                console.log("correct")
            } else {
                this.card.isCorrect = false;
                console.log("incorrect")
            }     
            this.$emit('next', this.card.isCorrect);
        }
    }
}
</script>

<style>

</style>