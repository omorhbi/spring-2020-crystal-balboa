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
		if (!token){
			console.log("Access denied!");
			return res.json({mistake: 'unauthorized'});
		}
		jwt.verify(token, process.env.TOKEN_SECRET, (err, user) =>{
			if (err){
				return res.json({mistake: 'not valid token'})
			}
			req.user = user.user;
			next(); 
		});
	}
}

app.post('/signup', async (req, res) => {
	const username = req.body.username;
	const upMyO = {username: username, password: req.body.password};
	const error = registerValidation(upMyO);
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
		location: req.body.location,
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
app.post('/location/show', authorized(), (req, res) => {
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

app.post('/location/prefshow', authorized(), async (req, res) => {
	const searchName = req.body.resObject.resName;
	let locName = req.body.resObject.resLoc;
	const currUser = await User.findOne({username: req.user.username});
	let priceRange = currUser.preferences.price;
	let preferences = currUser.preferences.type;
	if(priceRange.length === 0){
		priceRange = [1,2,3,4];
	}
	if(preferences.length === 0){
		preferences = ["American", "Chinese", "French", "Greek", "Indian", "Japanese", "Korean", "Mexican"];
	}

	if (locName === ''){
		locName = "New York City";
	}
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
			q: searchName,
		})
		.then(function(resData){
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
                	thumbnail: res.thumbnail,
                	price: res.price
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


app.post('/profile', authorized(), async (req, res) => {

	const currUser = await User.findOne({username: req.user.username});
	let priceRange = currUser.preferences.price;
	let preferences = currUser.preferences.type;
	let toSearch;
	if(priceRange.length === 0){
		priceRange = [1,2,3,4];
	}
	if(preferences.length === 0){
		preferences = ["American", "Chinese", "French", "Greek", "Indian", "Japanese", "Korean", "Mexican"];
		toSearch = "";
	}
	else{
		toSearch = preferences[Math.floor(Math.random() * preferences.length)];		
	}

	zomatoClient.locations({
		query: currUser.location,
		count: 1
	})
	.then(function(data){
		const entity_id = data[0].entity_id;
		const entity_type = data[0].entity_type;
		zomatoClient.search({
			entity_id: entity_id,
			entity_type: entity_type,
			count: 20,
			q: toSearch
		})
		.then(function(resData){
			// these two lists are temporary so they only serve as a model for how
			// these lists will be used when it comes from a database during the next sprint
			const savedRestaurants = currUser.history;

			let filteredRes;
			if (savedRestaurants.length === 0){
				filteredRes = resData.restaurants.filter(restaurant =>
		    	preferences.some(res => restaurant.cuisines.split(', ').includes(res))
		    	&& priceRange.includes(restaurant.price_range));

			}

			else if (savedRestaurants.length > 0){
				filteredRes = resData.restaurants.filter(restaurant =>
		    	preferences.some(res => restaurant.cuisines.split(', ').includes(res)) 
		    	&& priceRange.includes(restaurant.price_range));
				
				let newRes = [];
				for(let i=0; i<filteredRes.length; i++){
					let check = true;
					for(let j=0; j<savedRestaurants.length; j++){
						if(filteredRes[i].name === savedRestaurants[j].name){
							check = false;
						}
					}
					if(check){
						newRes.push(filteredRes[i]);
					}
				}
				filteredRes = newRes;
			}
			// console.log(filteredRes);
			let restaurants = filteredRes.map(r => {
					return {
						name: r.name,
						location: r.location.address,
						price: r.price_range,
						thumbnail: r.thumb,
						rating: r.user_rating.aggregate_rating,
						cuisine: r.cuisines
			      	}
		    });

			restaurants = restaurants.slice(0, 3);
		    return res.json({restaurants, currUser});
		})
		.catch(function(err){
			console.log(err)
		});
    })
    .catch(function(err) {
    	console.error(err);
    });
});

app.get('/meal_history', authorized(), (req, res)=>{
	User.findOne({username: req.user.username}, function(err, user){
		if (err){
			throw err;
		}
		else{
			res.json(user.history);
		}
	})
});

app.post('/meal_history', authorized(), (req,res)=>{
	const rest = req.body;
	const d = rest.d;
	const rest2 = new Restaurant({
		id: Date.now(),
		name: req.body.restaurant_name,
		location: req.body.address + " " + req.body.city,
		price: "",
		rating: "",
		cuisine: req.body.cuisine,
		date: req.body.date,
		dateMonth: req.body.dateMonth,
		dateDay: req.body.dateDay,
    	dateYear: req.body.dateYear,
    	thumbnail: req.body.thumb
	});
	//console.log(rest2);
	User.findOneAndUpdate({ username: req.user.username }, { $push: { "history": rest2 } },
	    function(err, node){
	    	if(err){
	    		return res.json({err: true});
	    	}
	    	else{
	    		return res.json();
	    	}
	    }
	);
})
 
app.post('/meal_history_delete', authorized(), (req, res)=>{
	if(req.body.id){
		User.findOneAndUpdate({username: req.user.username}, {$pull: {"history" : {id: req.body.id}}}, {safe: true, upsert: true},
			function(err, node){
				if(err){
					throw err;
					return res.json();
				}
				else{
					return res.json({ deleted: "Yay" });
				}
			})
	}
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

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'front-end')));
// Handle React routing, return all requests to React app
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'front-end', 'index.html'));
  });
}


// export the express app we created to make it available to other modules
module.exports = app;