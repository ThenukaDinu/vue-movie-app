import Vue from 'vue';
import VueRouter from 'vue-router';
import LatestMovie from '@/components/LatestMovie.vue';
import Movie from '@/components/Movie.vue';
import SearchMovie from '@/components/SearchMovie.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LatestMovie',
      component: LatestMovie,
    },
    {
      path: '/movie/:id',
      name: 'Movie',
      props: true,
      component: Movie,
    },
    {
      path: '/search/:name',
      name: 'SearchMovie',
      props: true,
      component: SearchMovie,
    },
  ],
});
