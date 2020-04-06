<template>
  <v-app id="center">
    <v-content class="v-content">
      <Header/>
      <router-link to="/home">HOME</router-link> | 
      <router-link to="/userForm">USER FORM</router-link> | 
      <router-link to="/login">LOGIN</router-link> | 
      <router-link to="/results">RESULTS</router-link>
      <br/><br/>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import Header from '@/components/Header.vue'

export default {
  name: 'App',

  components: {
    Header
  },

  data: () => ({
    //
  }),
};
</script>

<style scoped>
#center {
      margin: 0 auto;
    text-align: center;
}
</style>
