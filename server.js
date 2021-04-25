require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
const cors = require('cors');
const dbConfig = require('./db/db');
const authRoute = require('./routes/authRoute');
const categoryRoute = require('./routes/categoryRoute');
const contentRoute = require('./routes/contentRoute');

// Connecting with mongo db
mongoose.connect(dbConfig.db, {
   useNewUrlParser: true
}).then(() => {
      console.log('Database sucessfully connected')
   },
   error => {
      console.log('Database could not connected: ' + error)
   }
)

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
app.use(passport.initialize());
require("./middlewares/jwt")(passport);

app.use('/api/auth', authRoute)
app.use('/api/category', categoryRoute)
app.use('/api/content', contentRoute)

// Create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Connected to port ' + port)
})