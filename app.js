const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set('useFindAndModify', false);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect(process.env.MONGOURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const Route = require("./routes/route");
app.use("/",Route);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port 3000");
});
