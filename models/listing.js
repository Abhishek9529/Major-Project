const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type: String,
        required: true
    }, 
    description: String,
    image:{
        default: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
        type: Object,
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D": v,
    },
    price: Number,
    location: String,
    country: String
});

const Listing = new mongoose.model('Listing', listingSchema);
module.exports = Listing;