require('dotenv').config();
const mongoose = require('mongoose');



const Restaurant = new mongoose.Schema({
    name: String,
    location: String,
    price: String,
    rating: String,
    cuisine: String,
    date: Number,
    dateMonth: Number,
    dateDay: Number,
    dateYear: Number
});

const User = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    zipCode: Number,
    history: [Restaurant],
    preferences: {
        price: [Number], 
        type: [String]
    }
});

mongoose.model('User', User);
mongoose.model('Restaurant', Restaurant);
mongoose.connect(process.env.DB_CONN, {useNewUrlParser: true, useUnifiedTopology: true});