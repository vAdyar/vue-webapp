<template>
  <v-card
    class="mx-auto"
    max-width="444"
  >
    <v-card-text v-if="this.cue(this.index)">
      <p> {{ this.cue(this.index).category }} </p>
      <p class="display-1 text--primary">
        {{ this.cue(this.index).question }}
      </p>
      <div class="text--primary">
        <v-list rounded>
          <v-list-item-group v-model="this.cue(this.index).options" color="primary">
            <v-list-item
              v-for="(item, i) in this.cue(this.index).options"
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
import { mapGetters, mapActions } from 'vuex';

export default {
    component: {
        name: "Card"
    },
    data: function() {
        return {
          // cue: {}
        }
    },  
    props: {
        index: Number
    },
    methods: {
        ...mapGetters([
          'getQuestionById', 'getCorrect', 'getIndex'
        ]),
        ...mapActions([
          'setCorrect', 'setIndex'
        ]),
        answerClicked(item) {
          console.log(this.cue(this.index))
          console.log("item: "+item)
          let answer = this.getQuestionById()(this.index).correct_answer;

          if(answer === item) {
                this.setCorrect(this.getCorrect() + 1);
                console.log("correct")
            }     
            this.setIndex(this.getIndex() + 1);

        }
    },
    computed: {
      ...mapGetters({
        cue: 'getQuestionById'
    })
    
    // getQuestionById: {
    //   get() {
    //     return this.cue()
    //   },
    //   set(cue) {
    //     return cue
    //   }
    // }
    },
    async mounted() {
      await this.getQuestionById()(this.index)
    }
}
</script>

<style>

</style>