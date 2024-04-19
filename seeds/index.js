const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author:"6604236bfb2c66ff5d3f1d26",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvouuqwpv/image/upload/v1713251384/YelpCamp/ch6nzx674o0kza2kgh51.jpg',
                    filename: 'YelpCamp/ch6nzx674o0kza2kgh51'
                },
                {
                    url: 'https://res.cloudinary.com/dvouuqwpv/image/upload/v1713251384/YelpCamp/arl8gelxflqumjyk4hp8.jpg',
                    filename: 'YelpCamp/arl8gelxflqumjyk4hp8'
                }
              ],
            description:"just for test",
            price:12
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})