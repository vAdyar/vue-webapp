<template>
<div id="table">
  <v-card>
    <v-card-title>
      User Results
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
    ></v-data-table>
  </v-card>
</div>
</template>

<script>
import { db } from '../main'

  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            // sortable: false,
            value: 'name',
          },
          { text: 'Age', value: 'age' },
          { text: 'Location', value: 'location' },
          { text: 'Total Point', value: 'total_points' },
          { text: 'Points Scored', value: 'points_scored' }
        ],
        users:[]
      }
    },
    methods: {
        fetchUsers: function() {
            db.collection('users')
            .get()
            .then(querySnapshot => {
              const documents = querySnapshot.docs.map(doc => doc.data())
              this.users = documents
              console.log(this.users);
            })
        }
    },
    beforeMount: function() {
        this.fetchUsers();
    }
  }
</script>

<style scoped>
#table {
    width: 80%;
    margin: 10% auto;
}
</style>