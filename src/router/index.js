import Vue from 'vue'
import Router from 'vue-router'
import recommendationIndex from '@/views/recommendation/'
import songIndex from '@/views/song/'
import searchIndex from '@/views/search/'
import hotIndex from '@/views/hot/'
import artistIndex from '@/views/artists/'
import albumIndex from '@/views/album/'
import { component } from 'vue/types/umd'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'recommendation Index',
      component: recommendationIndex
    },

    {
      path: '/song/:id',
      name: 'play song',
      component: songIndex
    },
    {
      path: '/search',
      name: 'search index',
      component: searchIndex
    },
    {
      path: '/hot',
      name: 'hot index',
      component: hotIndex
    },
    {
      path: '/artist/:id',
      name: 'artist index',
      component: artistIndex
    },
    {
      path: '/album/:id',
      name: 'album index',
      component: albumIndex
    },

  ]
})
