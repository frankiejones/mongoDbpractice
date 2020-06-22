# Setting up HBS with Express

1. Initialise the project with npm init -y
```
npm init -y
```

2. Install express and express-handlebars inside of your application then add them to your index.js along with path

```
npm i express express-handlebars
```

```javascript
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const app = express(); //initialise express as a function
```

3. Basic folder structure for our application

```
project
│   index.js
│   readme.md   
│
└───lib
│      HarryPotter.js
│   
└───public
│      style.css
│    
└───views 
│   └───layouts
│          layout.hbs
│   index.hbs
```

4. Create your app.get and app.listen for your basic express web-server

```javascript
app.get('/', async (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
```

5. Above the app.get but below the const imports, put the following to setup the path for our style.css and other client-side code and the creation of the HBS template: 

```javascript
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set('view engine', '.hbs');
```

6. Setup your layout.hbs like a normal HTML file with a CSS link with a twist

```hbs
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <h1>Hello</h1>
    <p>I am a template</p>
    {{{body}}}
</body>

</html>
```

7. Head to the HarryPotter.js inside of the lib folder now and insert the following for a Harry Potter API function:

```javascript
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
```

8. Head back to your index.js in the root folder and import your file you just exported near the top of your file:

```javascript
// below your external module imports
const API = require('./lib/HarryPotter.js');
// above your app.use
```

9. Next, let's go back to our app.get('/') and modify it like this:

```javascript
    let data = await HarryPotter.getSortingHat();
    console.log(data)
    res.render('index', { data });
```

10. We have put data inside of an object in the res.render, so, in our index.hbs, let's put this: 

```hbs
<p>{{data}}</p>
```
11. We currently don't have a .env, so let's set that up:

```javascript
// npm i dotenv
require('dotenv').config(); // create a .env file and .gitignore
```

12. Run nodemon and load our localhost:3000