const BASE = 'https://pokeapi.co/api/v2/pokemon'

export async function fetchPokemonList(offset = 0, limit = 20) {
  const res = await fetch(`${BASE}?offset=${offset}&limit=${limit}`)
  return res.json()
}

export async function fetchPokemonDetail(name) {
  const res = await fetch(`${BASE}/${name}`)
  return res.json()
}