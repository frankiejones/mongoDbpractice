const fetch = require('node-fetch');

const getSwapi = async () => {
    const URL = `https://swapi.dev/api/people/5/`
    let data = await fetch(URL);
    let JSObject = await data.json();
    return JSObject;
}

module.exports = getSwapi;