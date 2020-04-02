<template>
  <v-app id="center">
    <v-content class="v-content">
      <router-link to="/">HOME</router-link> | 
      <router-link to="/about">ABOUT</router-link>
      
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
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
