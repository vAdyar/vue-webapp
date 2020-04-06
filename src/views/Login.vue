<template>
<div id="form">
    
        <!-- {{ this.user }} -->
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >

    <v-text-field
        v-model="form.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.password"
        :rules="passwordRules"
        label="Password"
        type="Password"
        required
      ></v-text-field>
      
      <br/>
    <v-btn
      color="blue"
      class="mr-4"
      @click="passwordSignIn"
    >
      Sign In
    </v-btn>

    <v-btn
      color="#777"
      class="mr-4"
      @click="signOut"
    >
      Sign Out
    </v-btn>
    <br/> <br/>
    <v-btn
      color="success"
      class="mr-4"
      @click="signInWithGoogle"
    >
      Sign In with Google
    </v-btn>

    <v-btn id="add" class="mx-2" fab dark color="indigo" to="/userForm">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>

  </v-form>
</div>
</template>

<script>
import { db } from '../main'
import firebase from "firebase"

  export default {
    data: () => ({
      valid: true,
      loading: true,
      user: null,
      form: {
        email: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must be less than 6 characters',
      ],
    }),
    methods: {
       signInWithGoogle: function() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then((result) => {
          this.user = result.user
          this.$router.replace({ name: "Home" });
          console.log("Success")
        }).catch(error => console.log(error))
      },
      passwordSignIn: function() {
          firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password)
          .then(result => {
              this.user = result.user
              this.$router.replace({ name: "Home" });
              console.log("Success")
          })
          .catch(function(error) {
              console.log(error)
        });
      },
      signOut: function() {
        firebase.auth().signOut().then(() => {
          this.user = null
        }).catch(err => console.log(error))
      }
    },
    beforeCreate: function() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user
          console.log(this.user)
        }
        this.loading = false
      })
    }
  }
</script>

<style scoped>
#form {
width: 40%;
padding: 0px;
margin: 10% auto;
}

#add {
    position: absolute;
    right: 50px;
    bottom: 50px;
}

</style>