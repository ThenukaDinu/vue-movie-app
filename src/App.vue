<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/" custom v-slot="{navigate}" style="cursor: pointer">
          <span @click="navigate" role="link">Movie Man</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3 style="margin-top: 17px">
        <v-text-field
          label="Movie Name"
          v-model="searchString"
          v-on:keydown.enter="()=> {dataAvailable ? searchMovie() : ''}"
        ></v-text-field>
      </v-flex>
      <v-btn text :disabled="!dataAvailable" @click="searchMovie">
        <span class="mr-2">Search</span>
      </v-btn>
    </v-toolbar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    searchString: ""
  }),
  methods: {
    searchMovie() {
      var repacedStr = this.searchString.replace(" ", "&");
      this.$router.push("/search/" + repacedStr).catch(() => {});
      this.searchString = "";
    }
  },
  computed: {
    dataAvailable() {
      return this.searchString !== null && this.searchString !== "";
    }
  }
};
</script>
