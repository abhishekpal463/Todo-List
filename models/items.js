const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemSchema);


const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("list", listSchema);

module.exports = {Item,List};