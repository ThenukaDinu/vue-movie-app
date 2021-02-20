<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>Welcome to single movie component</h2>
        <div>{{singleMovie}}</div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="text-xs-center">
        <v-dialog
          v-model="dialog"
          width="500">
          <v-btn
            slot="activator"
            color="green"
            dark>
            View Ratings
          </v-btn>
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title
            >
              Ratings
            </v-card-title>
            <v-card-text>
              <table style="width:100%" border="1" >
                <tr>
                  <th>Source</th>
                  <th>Ratings</th>
                </tr>
                <tr v-for="(rating,index) in this.ratings" :key="index">
                  <td align="center">{{ratings[index].Source}}</td>
                  <td align="center">{{ratings[index].Value}}</td>
                </tr>
              </table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="dialog = false"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      singleMovie: ""
    };
  },
  mounted() {
    axios
      .get(
        "http://www.omdbapi.com/?apikey=b984e58e&i=tt0209163&Content-Type=application/json"
      )
      .then(response => {
        this.singleMovie = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>