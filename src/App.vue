<template>
  <v-app>
    <v-content>
      <!-- <router-view ></router-view> -->
      <LatestMovie/>
    </v-content>
  </v-app>
</template>

<script>
import LatestMovie from './components/LatestMovie'
export default {
  name: "App",

  components: {
    LatestMovie: LatestMovie,
  },

  data: () => ({
    //
  })
};
</script>
