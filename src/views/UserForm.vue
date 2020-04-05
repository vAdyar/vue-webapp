<template>
<div id="form">
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="form.name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="form.age"
      :rules="ageRules"
      label="Age"
      type="Number"
      required
    ></v-text-field>

     <v-text-field
      v-model="form.location"
      :counter="20"
      :rules="locationRules"
      label="Location"
      required
    ></v-text-field>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree with the input details?"
      required
    ></v-checkbox>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>
    <v-btn
      color="success"
      class="mr-4"
      @click="submit"
    >
      Submit Form
    </v-btn>
  </v-form>
</div>
</template>

<script>
  export default {
    data: () => ({
      valid: true,
      form: {
        name: '',
        age: '',
        location: ''
      },
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      ageRules: [
        v => !!v || 'Age is required',
        v => (v >= 18 && v <= 100) || 'Age must be between 18 and 100'
      ],
      locationRules: [
        v => !!v || 'Location is required'
      ],
      checkbox: false,
    }),

    methods: {
      reset () {
        this.$refs.form.reset()
      },
      submit() {
        console.log(this.form)
        const payload = {
          name: this.form.name,
          age: this.form.age,
          location: this.form.location,
          preferred_category: '',
          total_points: 0,
          points_scored: 0
        }
        this.$http.post('https://vue-quiz-app-823e4.firebaseio.com/quiz/users.json', payload)
        .then( function(data) {
          console.log(data);
        })
      }
    },
  }
</script>

<style scoped>
#form {
width: 80%;
padding: 0px;
margin: 10% auto;
}

</style>