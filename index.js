const express = require("express");
const ep = express();
const dotenv = require('dotenv')
const connection = require("./banco/banco");
const User = require("./banco/Login");
const bcrypt = require('bcrypt');


connection.authenticate().then(() => {
    console.log("conectado ao mysql");
}).catch((erro) =>{
    console.log(erro)
})

dotenv.config({path: './.env'})



ep.set('view engine', 'ejs');
ep.use(express.static('public'));
ep.use(express.urlencoded({extended: false}));
ep.use(express.json());






//rotas

ep.use('/',require('./routes/pages'));

ep.post("/auth/register",  async (req, res) => {
    const {user, password, passwordConfirm} = req.body

    const userWithEmail = await User.findOne({ where: {user}  }).catch((err) =>{
        console.log(err);
    });

    if(userWithEmail){
        return res.json({ message: "Email ou usuiario ja existe!"})
    }

    let senha = await bcrypt.hash(password, 8);

    const newUser = new User({user,senha});
    const savedUser = await newUser.save().catch((err) =>{
        console.log(err);
        res.json({ error : "nao foi"});
    })

    if(savedUser) res.json({message: "foi"})

})


ep.post("/login",  async (req, res) => {
    const {user} = req.body

    const userWithEmail = await User.findOne({ where: {user}  }).catch((err) =>{
        console.log(err);
    });
    if(!userWithEmail){
        return res.json({ message: "Email ou usuiario ja existe!"})
    }

    if (userWithEmail) {
        const password = await bcrypt.compare(req.body.password, userWithEmail.senha);
        if(password === true)
            res.json({ message: "Logado"})
    }





    

})



ep.listen(8080 , () => {
    console.log('servidor aqui na porta 8080')
});