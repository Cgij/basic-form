const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));


const uri = "mongodb+srv://jonasgestopa:jonas121199@leaflix-east.3muhujj.mongodb.net/basicformDB?retryWrites=true&w=majority"
//const uri = "mongodb://localhost:27017/basicformDB"
mongoose.connect(uri);

const schema = new mongoose.Schema({
  fname: 'string', lname: 'string',
  st: 'string', city: 'string', stateprovince: 'string', zcode: 'string',
  phone: 'string'
});

const CustomerDetails = mongoose.model('CustomerDetails', schema);


app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res){
  const fn = req.body.firstName;
  const ln = req.body.lastName;
  const s = req.body.streetAddress;
  const c = req.body.city;
  const sp = req.body.stateProvince;
  const z = req.body.zipCode;
  const n = req.body.phoneNumber;

  const i = new CustomerDetails({
    fname: fn, lname: ln,
    st: s, city: c, stateprovince: sp, zcode: z,
    phone: n
  });
  i.save();
  res.send("Form submitted successfully!");
});



app.listen(process.env.PORT || 3000, function(){
  console.log("Server started running");
});
