const express = require("express");
const ep = express();
const logintabela = require("../banco/Login");



ep.post("/register", (req, res) => {
    var usuario = req.body.email
    var senha = req.body.password


})


