require('dotenv').config();
const mongoose = require('mongoose');


const Restaurant = new mongoose.Schema({
    id: String, 
    name: String,
    location: String,
    price: String,
    rating: String,
    cuisine: String,
    date: String,
    dateMonth: Number,
    dateDay: Number,
    dateYear: Number,
    thumbnail: String
});

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    history: [Restaurant],
    preferences: Object
});

mongoose.model('User', User);
mongoose.model('Restaurant', Restaurant);
mongoose.connect(process.env.DB_CONN, {useNewUrlParser: true, useUnifiedTopology: true});