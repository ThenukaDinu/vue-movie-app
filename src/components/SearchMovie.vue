<template>
  <div>
    <v-container v-if="loading">
      <div class="text-xs-center">
        <v-progress-circular indeterminate :size="150" :width="8" color="green"></v-progress-circular>
      </div>
    </v-container>

    <v-container v-else-if="noData">
      <div class="text-xs-center">
        <h2>No movie found with {{this.name}}</h2>
      </div>
    </v-container>

    <v-container v-else grid-list-xl>
      <br>
      <v-layout wrap>
        <v-flex xs12 md3 xl2 sm6 v-for="(item, index) in movieResponse" :key="index" mb-2>
          <v-card>
            <v-img :src="item.Poster" aspect-ratio="1"></v-img>

            <v-card-title primary-title>
              <div>
                <h2>{{item.Title}}</h2>
                <div>Year: {{item.Year}}</div>
                <div>Type: {{item.Type}}</div>
                <div>IMDB-id: {{item.imdbID}}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn rounded color="green" @click="singleMovie(item.imdbID)">View</v-btn>
              <v-btn rounded color="green" @click="redirectToIMDB(item.imdbID)">Visit Site</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MovieApi from "../services/MovieApi";

export default {
  props: ["name"],
  data: () => {
    return {
      loading: true,
      movieResponse: [],
      noData: false
    };
  },
  methods: {
    singleMovie(id) {
      this.$router.push("/movie/" + id);
    },
    fetchResult(value) {
      MovieApi.fetchMovieCollection(value)
        .then(response => {
          if (response.Response === "True") {
            this.movieResponse = response.Search;
            this.noData = false;
            this.loading = false;
            return;
          }
          this.noData = true;
          this.loading = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    redirectToIMDB(id) {
      window.open("https://www.imdb.com/title/" + id, "_blank");
    }
  },
  mounted() {
    this.fetchResult(this.name);
  },
  watch: {
    name(value) {
      this.fetchResult(value);
    }
  }
};
</script>

<style lang="css">
.v-progress-circular {
  margin: 1rem;
}
</style>