export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getPokemonSvgImg(pokemonId) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
}
