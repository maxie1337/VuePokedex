<template>
  <div v-if="pokemon" class="pokemon-detail">
    <h2>{{ capitalize(pokemon.name) }}</h2>
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name"/>
    <p>Längd: {{ pokemon.height }} {{"meter"}}</p>
    <p>Vikt: {{ pokemon.weight }} {{"kilo"}}</p>
    <p>Type(s):
      <span v-for="t in pokemon.types" :key="t.type.name">
        {{ t.type.name }}
      </span>
    </p>
    <button @click="goBack">Tillbaka</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchPokemonDetail } from '../services/pokeapi'

const route = useRoute()
const router = useRouter()
const pokemon = ref(null)

function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

async function loadDetail() {
  const name = route.params.name
  pokemon.value = await fetchPokemonDetail(name)
}

function goBack() {
  router.push({ name: 'List' })
}

onMounted(loadDetail)
</script>

<style scoped>
.pokemon-detail {
  text-align: center;
  padding: 1rem;
}
button {
  margin-top: 1rem;
  padding: .5rem 1rem;
  cursor: pointer;
}
</style>