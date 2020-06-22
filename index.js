// npm i express express-handlebars
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express(); // initialising express to be used as a function

require('dotenv').config(); // create a .env file and .gitignore

mongoose.connect(process.env.databaseURL, {
    useNewUrlParser:true, useUnifiedTopology: true
});

const APIdata = require('./lib/getAPI')
const getSwapi = require('./lib/getSwapi');
const getPokemon = require('./lib/getPokemon');
const userModel = require('./models/userModel');
const productModel = require('./models/productModel');

app.use(bodyParser.urlencoded({extended: false}));
// form that accepts urls - take everything as a string
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))

app.set('view engine', '.hbs');
//view that I'm rendering plus the engine ext name

app.get('/', async (req, res) => {
    // let data = {
    //     isOn:false,
    //     firstName:"Frankie",
    //     lastName:"jones",
    //     bootcamp:{
    //         class: 14
    //     }
    // };
    const product = new productModel({
        name: "frankie",
        price: 3,
        inStock:true
    })
    product.save()
    res.render('index');
})

app.get('/about', async (req, res) => {
    let ID = "5ef0aa0a4f7f28616bf3fcea"
    const user = await userModel.findById(ID);
    // search by username and return that... POST - userName (req.body)
    // const user = await userModel.findOne()
    // const user = await userModel.find({});
    // find will return an array - map through it to get the users
    // find and update is a good one to try out
    console.log(user);
 
    res.render('about', {user});
});

app.post('/about', async (req, res) => {

    let { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        //get user info from form, has all fields been filled out? 
		res.render('about', {err: "Please provide all credentials"});
		return; // this stops the execution of any of the code below if any of the if statement is not met.
    };
 
    const user = new userModel({
        //userName:req.body.userName, // referf to the form with action post
        //email:req.body.email, // refers to email name in form
        //password:req.body.password // refers to passowrd name in form 
        userName, // referf to the form with action post
        email, // refers to email name in form
        password // refers to passowrd name in form 
    })
    await user.save()
    res.render('about');
});


app.get('/harry', async (req, res) => {
    let data = await APIdata.getSortingHat();
    console.log(data);
    res.render('harry', { data });
})

app.get('/swapi', async(req, res) => {
    let data = await getSwapi();
    // console.log(data);
    res.render('swapi', {data});

})

app.get('/pokemon', async(req, res) => {
    let pokemon = 'mewtwo'
    let data = await getPokemon(pokemon);
    console.log(data);
    res.render('pokemon', {pokemon, data});
})

app.post('/pokemon', async(req, res) => {
    let pokemon = req.body.pokemon; // somewhere in the body, there is a name called pokemon
    let data = await getPokemon(pokemon);
    console.log(data);
    res.render('pokemon', { pokemon, data });
})



app.listen(process.env.PORT || 3005, () => {
    console.log('Server is running on 3005. Chase it.');
})