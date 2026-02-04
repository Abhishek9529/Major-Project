const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const path = require('path');
const Listing = require('./models/listing.js');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

app.use(methodOverride('_method'));

// ejs setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

// url encoded setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")));

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// mongodb connection
main().then(() => {
    console.log("connected to db...")
}).catch((err) => console.log(err))
async function main() {
    await mongoose.connect(MONGO_URL);
}

// root route
app.get("/", (req, res) => {
    res.send("root route");
})

// app.get("/testListing", async(req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// })

// index route
app.get("/listings", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("./listings/index.ejs", { allListing });
})

// new route
app.get("/listings/new", (req, res) => {
    res.render("./listings/new.ejs");
})

app.post("/listings", async (req, res) => {
    let newListing = new Listing(req.body.listing); // this returns object
    await newListing.save();
    res.redirect("/listings");
})

// show route
app.get("/listings/:id", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(`${id}`);
    // console.log(listing);
    res.render("./listings/show.ejs", { listing });
})

// update route 
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(`${id}`);
    res.render("./listings/edit.ejs", { listing });
    // console.log(listing);
})

app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(`${id}`, { ...req.body.listing }); // basicall destructure the object : {...req.body.listing}
    res.redirect(`/listings/${id}`);
})

app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(`${id}`);
    // console.log(deleteListing);
    res.redirect("/listings");
});



app.listen(port, () => {
    console.log(`server is running in ${port}`);
})