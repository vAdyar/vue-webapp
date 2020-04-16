<template>
  <div>
    <v-app-bar
      color="deep-purple accent-4"
      dense
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Quiz Time</v-toolbar-title>

      <v-spacer></v-spacer>
      <div v-if="user.data">
      Hello, {{ user.data.displayName }}
      </div>
      <div class="text-center">
        <v-btn color="#222" @click.prevent="signOut" >Log out</v-btn>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <router-link to="/home">HOME</router-link>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <router-link to="/results">RESULTS</router-link>
          </v-list-item>
          
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <router-link to="/userForm">USER FORM</router-link>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    
  </div>
</template>

<script>
import firebase from "firebase"
import { mapGetters } from 'vuex'

export default {
    data: () => ({
      drawer: false,
    }),
    methods: {
    signOut: function() {
        firebase.auth().signOut().then(() => {
          this.user = null
          this.$router.replace("/login")
        }).catch(err => console.log(error))
      }
  },
  computed: {
    ...mapGetters([ 'user' ])
  }
  
  }
</script>

<style>

</style>