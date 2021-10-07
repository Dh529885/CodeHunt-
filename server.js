// Dependencies
const express = require('express');
const codeRouter = express.Router();
const methodOverride = require('method-override');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();


// Middleware
// Body parser middleware: give us access to req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.get('/', (req,res) => {
    res.redirect('/codehunt');
})

// Routes / Controllers
const codeControllers = require("./controllers/code-controllers.js");
app.use('/codehunt', codeControllers);


// Database Connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Listener
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Hunt is listning on port: ${PORT}`));