<template>
  <v-container>
    <v-container v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular indeterminate :size="150" :width="8" color="green"></v-progress-circular>
      </div>
    </v-container>

    <v-layout row wrap v-else>
      <v-flex xs12>
        <h2>{{ singleMovie.Title }}</h2>
        <br />

        <v-container>
          <v-row>
            <v-col>
              <v-img :src="singleMovie.Poster" aspect-ratio="1"></v-img>
            </v-col>
            <v-col :offset="1">
              <div>
                <h2>{{ singleMovie.Title }}</h2>
                <div>Year: {{ singleMovie.Year }}</div>
                <div>Type: {{ singleMovie.Type }}</div>
                <div>IMDB: {{ singleMovie.imdbID }}</div>
                <div>IMDB Ratings: {{ singleMovie.imdbRating }}</div>
                <br />
                <div>
                  <h3>Actors</h3>
                  <v-list>
                    <v-list-item
                      :dense="true"
                      v-for="(actor, index) in actors"
                      :key="index"
                    >{{actor}}</v-list-item>
                  </v-list>
                </div>
                <div>
                  <h3>Awards</h3>
                  <p>{{singleMovie.Awards}}</p>
                </div>
                <br />
                <div>Director: {{singleMovie.Director}}</div>
                <div>Country: {{singleMovie.Country}}</div>
                <div>Genre: {{singleMovie.Genre}}</div>
                <div>Language: {{singleMovie.Language}}</div>
              </div>

              <div style="margin-top: 50px; padding-left: 15px;">
                <v-app id="inspire">
                  <v-row justify="left">
                    <v-dialog v-model="dialog" width="500">
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="green" dark v-bind="attrs" v-on="on">View Ratings</v-btn>
                      </template>
                      <v-card>
                        <v-card-title primary-title>
                          <span class="headline grey lighten-2">Ratings</span>
                        </v-card-title>
                        <v-card-text>
                          <table style="width:100%" border="1">
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
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" flat @click="dialog = false">OK</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </v-app>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import MovieApi from "../services/MovieApi";

export default {
  props: ["id"],
  data() {
    return {
      singleMovie: "",
      dialog: false,
      loading: true,
      actors: [],
      ratings: ""
    };
  },
  mounted() {
    MovieApi.fetchSingleMovie(this.id)
      .then(response => {
        this.singleMovie = response;
        this.actors = this.singleMovie.Actors.split(",");
        this.ratings = this.singleMovie.Ratings;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
</style>