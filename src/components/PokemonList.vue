<template>
  <div class="pokemon-grid">
    <div
      v-for="p in pokemons"
      :key="p.id"
      class="pokemon-card"
      @click="goToDetail(p.name)"
    >
      <img :src="p.image" :alt="p.name" />
      <!-- Rätt bindning: -->
      <p>{{ capitalize(p.name) }}</p>
    </div>
  </div>

  <div class="load-more">
    <button @click="loadMore">Hämta fler Pokémon</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchPokemonList } from '../services/pokeapi'

const pokemons = ref([])
let offset = 0
const limit = 20
const router = useRouter()

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

async function loadPokemon() {
  const data = await fetchPokemonList(offset, limit)
  const items = data.results.map((p, i) => {
    const id = offset + i + 1
    return {
      name: p.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
      id
    }
  })
  pokemons.value.push(...items)
}

function loadMore() {
  offset += limit
  loadPokemon()
}

function goToDetail(name) {
  router.push({ name: 'Detail', params: { name } })
}

onMounted(loadPokemon)
</script>

<style scoped>
.pokemon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
.pokemon-card {
  background: #f2f2f2;
  border-radius: 8px;
  text-align: center;
  padding: .5rem;
  cursor: pointer;
  transition: transform .2s;
}
.pokemon-card:hover { transform: scale(1.05); }
.load-more { text-align: center; margin: 1rem 0; }
button { padding: .5rem 1rem; cursor: pointer; }
</style>