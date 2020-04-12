// import and instantiate express
const express = require('express'); // CommonJS import style!
const app = express(); // instantiate an Express object
const bodyParser = require('body-parser');
const zomato = require('zomato.js');
const apiKey = process.env.ZOMATO_API_KEY; //export ZOMATO_API_KEY="key"
const zomatoClient = new zomato(apiKey);

// use the bodyparser middleware to parse any data included in a request
app.use(bodyParser.json());  // decode JSON-formatted incoming POST data
app.use(bodyParser.urlencoded({extended: true})); // decode url-encoded incoming POST data

// post request to show search results
app.post('/location/show', (req, res) => {
	const searchName = req.body.resObject.resName;
	const locName = req.body.resObject.resLoc;
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

// export the express app we created to make it available to other modules
module.exports = app;