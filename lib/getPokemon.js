const fetch = require('node-fetch');

const getPokemon = async (pokemon) => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    let data = await fetch(URL);
    let JSObject = await data.json();
    return JSObject;
}

module.exports = getPokemon;