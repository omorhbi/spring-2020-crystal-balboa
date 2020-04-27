// import and instantiate express
const express = require('express'); // CommonJS import style!
require('dotenv').config();
const app = express(); // instantiate an Express object
const path = require('path');
const bodyParser = require('body-parser');
const zomato = require('zomato.js');
const apiKey = process.env.ZOMATO_API_KEY; //export ZOMATO_API_KEY="key"
const zomatoClient = new zomato(apiKey);
require('./db');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Restaurant = mongoose.model('Restaurant');
const { registerValidation, loginValidation } = require('./validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// use the bodyparser middleware to parse any data included in a request
app.use(bodyParser.json());  // decode JSON-formatted incoming POST data
app.use(bodyParser.urlencoded({extended: true})); // decode url-encoded incoming POST data
app.use(express.json()); // allow express to use json that arrives from the body

function authorized(){
	return function(req, res, next){
		const authHeader = req.headers['authorization'];
		const token = authHeader && authHeader.split(' ')[1];
		//const token = req.header('auth-token');
		//console.log(token);
		if (!token){
			console.log("Access denied!");
			return res.json({mistake: 'unauthorized'});
		}
		jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
			if (err){
				return res.json({mistake: 'not valid token'})
			}
			//console.log(user);
			req.user = user.user;
			//console.log(req.user.name);
			console.log('valid token');
			next(); 
		});
	}
}

app.post('/signup', async (req, res) => {
	const username = req.body.username;
	const upMyO = {username: username, password: req.body.password};
	const error = registerValidation(upMyO);
	//console.log(error);
	if (error.error) {
		console.log("validation error");
		console.log(error.error);
		return res.json({mistake: "error"});
		//return res.send(error);
	}
	const userFound = await User.findOne({username: username});
	if (userFound){
		console.log('username already exists');
		return res.json({mistake: "error"});
	}

	// hash passwords
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		name: req.body.firstname,
		username: username,
		password: hashedPass,
		zipCode: req.body.zipCode,
		history: [],
		preferences: {
			price: [1,2,3,4],
			type: []
		}
	});
	
	user.save((err) =>{
		if (err){
			console.log(err + "user died");

		}
		else {
			console.log(user + "user added");
			const token = jwt.sign({user}, process.env.TOKEN_SECRET, {
			expiresIn: "1d"
			});
			console.log(token, " this is the token");
			res.json({ token: token});
		}
	});
});

app.post('/login', async (req,res) => {
	const username = req.body.username;
	const upMyO = {username: username, password: req.body.password};
	const error = registerValidation(upMyO);
	if (error.error) {
		console.log("validation error");
		console.log(error.error);
		return res.json({ mistake: "Error"});
	}

	const user = await User.findOne({username: req.body.username});
	if (!user){
		console.log('user is not found');
		return res.json({ mistake: "Error"});
	}
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword){
		console.log('Invalid Password');
		return res.json({ mistake: "Error"});
	}
	// create a token for the user
	const token = jwt.sign({user}, process.env.TOKEN_SECRET, {
		expiresIn: "1d"
	});
	console.log("Logged in!", req.headers);
	return res.json({ token: token });	
});


// post request to show search results
app.post('/location/show', (req, res) => {
	const searchName = req.body.resObject.resName;
	let locName = req.body.resObject.resLoc;
	if (locName === ''){
		locName = "New York City";
	}
	zomatoClient.locations({
	query: locName, //Location
	count: 1
	})
	.then(function(data) {
		const entity_id = data[0].entity_id;
		const entity_type = data[0].entity_type;
		zomatoClient.search({
			entity_id: entity_id,
			entity_type: entity_type,
			count: 10,
			q: searchName //Search query
		})
		.then(function(resData){
			//console.log(resData)
			const restaurants = resData.restaurants.map(r => {
				return {
					name: r.name,
					location: r.location.address,
					price: r.price_range,
					thumbnail: r.thumb,
					rating: r.user_rating.aggregate_rating,
					cuisine: r.cuisines
		      	}
		    });
		    res.json({ restaurants });
		})
		.catch(function(err){
			console.log(err)
		});
    })
    .catch(function(err) {
    	console.error(err);
    });
});

app.post('/location/prefshow', authorized(), (req, res) => {
	const searchName = req.body.resObject.resName;
	let locName = req.body.resObject.resLoc;
	const priceRange = [1,2,3,4];
	const preferences = ["American", "Desserts", "Chinese"];

	if (locName === ''){
		locName = "New York City";
	}
	console.log(req.body);
	zomatoClient.locations({
		query: locName,
		count: 1
	})
	.then(function(data){
		const entity_id = data[0].entity_id;
		const entity_type = data[0].entity_type;
		zomatoClient.search({
			entity_id: entity_id,
			entity_type: entity_type,
			nameQuery: searchName,
		})
		.then(function(resData){
			//console.log(resData.restaurants);
			let restaurants = resData.restaurants.map(r => {
				return {
					name: r.name,
					location: r.location.address,
					price: r.price_range,
					thumbnail: r.thumb,
					rating: r.user_rating.aggregate_rating,
					cuisine: r.cuisines
		      	}
		    });
		    //console.log(restaurants);
		    let slicedData;
    		let splitCuisines;
            const maxPriceRange = Math.max(...priceRange);
            const parsedData = restaurants;
            for (let i = 0; i < parsedData.length; i++){
                splitCuisines = parsedData[i].cuisine.split(', ');
            }
            const filteredRes = parsedData.filter(restaurant =>
                preferences.some(r => restaurant.cuisine.split(', ').includes(r)) && restaurant.price <= maxPriceRange
            );
            if (filteredRes.length <= 10){
            	slicedData = filteredRes;
            }
            else if (filteredRes.length > 10){
            	slicedData = filteredRes.slice(0,10);
            }
            restaurants = slicedData.map(res => {
            	let address = res.location.substr(0, res.location.indexOf(','));
            	let state = res.location.substr(res.location.indexOf(',') + 1);
            	if (address === ""){
            		address = state;
                    state = "";
                }
                return {
                	restaurant_name: res.name,
                	address: address,
                	city: state,
                	cuisine: res.cuisine,
                	thumbnail: res.thumbnail
                }
            });
            console.log(restaurants);
		    res.json({ restaurants });
		})
		.catch(function(err){
			console.log(err)
		});
    })
    .catch(function(err) {
    	console.error(err);
    });
});


app.post('/profile', authorized(), async (req, res) => {


	zomatoClient.locations({
		query: "New York City",
		count: 1
	})
	.then(function(data){
		const entity_id = data[0].entity_id;
		const entity_type = data[0].entity_type;
		zomatoClient.search({
			entity_id: entity_id,
			entity_type: entity_type,
			count: 3
		})
		.then(function(resData){
			// these two lists are temporary so they only serve as a model for how
			// these lists will be used when it comes from a database during the next sprint
			const savedRestaurants = ["Joe's Shanghai", "Xi'an Famous Foods"]
			const savedPreferences = ["Chinese", "American", "Italian", "Desserts", "New American", "Bagels"]
			
			const filteredRes = resData.restaurants.filter(restaurant =>
		    	(!savedRestaurants.includes(restaurant.name)) && savedPreferences.some(res =>
		    		restaurant.cuisines.split(', ').includes(res)));
			
			const restaurants = filteredRes.map(r => {
					return {
						name: r.name,
						location: r.location.address,
						price: r.price_range,
						thumbnail: r.thumb,
						rating: r.user_rating.aggregate_rating,
						cuisine: r.cuisines
			      	}
		    });

		    res.json({ restaurants });
		})
		.catch(function(err){
			console.log(err)
		});
    })
    .catch(function(err) {
    	console.error(err);
    });
});

app.get('/meal_history', (req, res)=>{
	let id = "5ea635a502020a767cd242a7";
	User.findById(id, function(err, User){
		if (err){
			throw err;
		}
		else{
			res.json(User.history);
		}
	})
});

app.post('/preferences', authorized(), (req,res) => {
	const userN = req.user.username;
	const query = {username : userN};
	const update = {preferences : {
		price : req.body.resObject.prices,
		type : req.body.resObject.cuisines
	}}
	User.findOneAndUpdate(query, update, () => {
		res.json({success : 'okay'});
	})

});

/** 
app.post('/meal_history', (req, res)=>{
	let id = "5ea635a502020a767cd242a7";
	User.findById(id, function(err, User){
		if(err){
			throw err;
		}
		else{
			console.log(req.body);
		}
	})
})
*/

// export the express app we created to make it available to other modules
module.exports = app;