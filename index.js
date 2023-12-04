// Constantes:

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const path = require('path');
const router = express.Router();

//Chama dotenv

require('dotenv').config()

// Express / Json

app.use(
    express.urlencoded({

        extended: true,

    }),
)

app.use(express.json());

//Rotas da API
const despesaRoutes = require('./routes/despesaRoutes')

app.use('/api/despesas', despesaRoutes)

const tipo_pagamentoRoutes = require('./routes/tipo_pagamentoRoutes')

app.use('/api/pagamentos', tipo_pagamentoRoutes)

const categoriaRoutes = require('./routes/categoriaRoutes')

app.use('/api/categorias', categoriaRoutes)

// Rota inicial

app.get('/', (req, res) => {

    // Res
    res.sendFile(path.join(__dirname+'/index.html'))
    //res.json({message: "Porojeto NodeJs"})

})

app.use('/', router);

//Rota sobre

router.get('/sobre', function(req, res){

    res.sendFile(path.join(__dirname +'/sobre.html'))
})

//mongodb+srv://<User>:<password>@muralisdata.n2kabek.mongodb.net/?retryWrites=true&w=majority

const DB_USER = process.env.DB_USER
const DB_PSSWD = encodeURIComponent(process.env.DB_PSSWD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PSSWD}@muralisdata.n2kabek.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => {
    console.log("Connected to MongoDB")

    //Porta utilizada:
    app.listen(process.env.port || 3000);
})

.catch((err) => console.log(err))


console.log("Servidor online!");