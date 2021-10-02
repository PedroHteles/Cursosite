const express = require("express");
const ep = express();




ep.get("/", (req, res) =>{
    var msg = "aopa"
    res.render("index.ejs")
})

ep.get("/register", (req, res) =>{
    res.render("register.ejs")
})


module.exports = ep;