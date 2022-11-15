require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose')

const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const session = require('express-session')
const MongoDbStore = require('connect-mongodb-session')(session);
;
const passportStrategy = require("./passport");
const app = express();

const MONGODB_URI = process.env.MONGODB_URI
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: 'sessions'
})


app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use("/auth", authRoute);



const port = process.env.PORT || 8080;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();