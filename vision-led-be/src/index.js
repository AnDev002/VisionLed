
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require('./Routes');
const cors = require('cors')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compressionMiddleware = require('./MiddleWare/ApplyCompression');
const compression = require('compression'); 
const admin = require("firebase-admin");
//const { session } = require("passport");
//const passport = require("passport");

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: "https://visionled.vn",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(session({
//  secret: process.env.GOOGLE_CLIENT_SECRET,
//  resave: false,
//  saveUninitialized: true
//}))

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
// app.post('/auth/firebase/google', async (req, res) => {
//   const { idToken } = req.body;
  
//   try {
//       // Xác thực ID Token với Firebase Admin SDK
//       const decodedToken = await admin.auth().verifyIdToken(idToken);
//       const uid = decodedToken.uid;
      
//       // Kiểm tra nếu người dùng đã có trong cơ sở dữ liệu (MongoDB)
//       let user = await User.findOne({ email: decodedToken.email });
      
//       if (!user) {
//           // Nếu người dùng chưa có, bạn có thể tạo mới người dùng
//           user = new User({
//               name: decodedToken.name,
//               email: decodedToken.email,
//               avatar: decodedToken.picture,
//               typeLogin: 'google'
//           });
//           await user.save();
//       }

//       // Tạo JWT cho người dùng (JWT này sẽ được sử dụng trong ứng dụng của bạn)
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

//       // Gửi lại token cho frontend để sử dụng
//       res.status(200).json({ token });

//   } catch (error) {
//       console.error("Error verifying Firebase ID token:", error);
//       res.status(401).json({ message: 'Invalid Firebase token' });
//   }
// });

app.use(cookieParser())
app.use(compression({ threshold: 1024 }));
app.use(compressionMiddleware);
//app.use(passport.initialize());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

routes(app)

mongoose.connect(`mongodb+srv://annguyenthien281102:KiOlJHJGnKDhnIiw@cluster0.x0g2sj6.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Connect Db success!")
  })
  .catch((err) => {
    console.log(err)
  })

app.listen(port, () => {
  console.log("server is running in port: " + port);
});
