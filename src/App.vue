<template>
  <v-app id="center">
    <v-content class="v-content">
      <Header/>
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
