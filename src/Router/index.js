import { createRouter, createWebHistory } from 'vue-router'
import PokemonList from '../components/PokemonList.vue'
import PokemonDetail from '../components/PokemonDetail.vue'

const routes = [
  { path: '/', name: 'List', component: PokemonList },
  { path: '/pokemon/:name', name: 'Detail', component: PokemonDetail, props: true }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})