const express = require("express");
const mongoose = require("mongoose");
const _=require("lodash");
const {Item,List} = require("../models/items");

const item1 = new Item({
  name: "Welcome todo list"
});
const item2 = new Item({
  name: "Hit the + button to add a new item"
});
const item3 = new Item({
  name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

exports.addList = async (req,res) =>{
  const itemName = req.body.newItem;
  const listName=req.body.list;
  const item = new Item({
    name: itemName
  });
  if(listName=="Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listName},function(err,foundList){
      foundList.items.push(item);
      foundList.save();
      res.redirect("/"+listName);
    });
  }
};

exports.showList = async(req,res)=>{
    Item.find({}, function(err, items) {

    if (items.length === 0) {

      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Added successfully");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: items
      });
    }
  });
};

exports.customListName = async(req,res)=>{
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({
    name: customListName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        //Create n new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //show a existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        })
      }
    }
});
};

exports.deleteList = async (req,res)=>{
    const checkedItemId = req.body.checkbox;
  const listName=req.body.listName;
  if(listName=="Today"){
    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (!err) {
        console.log("Deleted successfully");
        res.redirect("/");
      }
    });
  }
  else{
    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemId}}},function(err,foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    });
  }
};