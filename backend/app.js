const express = require('express');
const app = express();
const product=require("./routes/productRoute");
const user=require("./routes/userRoute");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const category  = require('./routes/categoryRoute');
const errorMiddleware = require('./middleware/error')
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
const cors=require("cors")
app.use(cors({
  origin: "http://localhost:3001"
}))
app.use("/product",product);
app.use("/user",user);
app.use("/category",category);
app.use(errorMiddleware)

module.exports =app