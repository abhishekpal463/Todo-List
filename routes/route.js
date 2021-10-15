const express = require("express");
const Router = express.Router();

const {
        customListName,
        deleteList,
        addList,
        showList
    } = require("../controller/index");

Router.get("/:customListName",customListName);
Router.post("/delete",deleteList);
Router.post("/",addList);
Router.get("/",showList);

module.exports = Router; 