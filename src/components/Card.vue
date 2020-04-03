<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <p> {{ cue.category }} </p>
      <p class="display-1 text--primary">
        {{ cue.question }}
      </p>
      <div class="text--primary">
        <v-list rounded>
          <v-list-item-group v-model="this.cue.options" color="primary">
            <v-list-item
              v-for="(item, i) in this.cue.options"
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
  </v-card>
</template>

<script>
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
        cue: Object,
        index: Number
    },
    methods: {
        answerClicked(item) {
            if(this.cue.correct_answer === item) {
                this.card.isCorrect = true;       
                console.log("correct")
            } else {
                this.card.isCorrect = false;
                console.log("incorrect")
            }     
            this.$emit('next', this.card.isCorrect);
            return true;
        }
    }

}
</script>

<style>

</style>