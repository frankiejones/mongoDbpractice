const fetch = require('node-fetch');
const URL = `https://www.potterapi.com/v1/sortinghat`

const getSortingHat = async () => {
    let data = await fetch(URL);

    let JSObject = await data.json();
    return JSObject;
}

module.exports = {
    getSortingHat
}