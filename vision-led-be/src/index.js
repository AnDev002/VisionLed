const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require('./Routes');
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compressionMiddleware = require('./MiddleWare/ApplyCompression');
const compression = require('compression'); // Thêm dòng này
const { session } = require("passport");
const passport = require("passport");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: process.env.URL_CLIENT
}))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(session({
  secret: process.env.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(cookieParser())
app.use(compression());
app.use(compressionMiddleware);
app.use(passport.initialize());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

routes(app)

mongoose.connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect Db success!")
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(port, () => {
  console.log("server is running in port: " + port);
});
