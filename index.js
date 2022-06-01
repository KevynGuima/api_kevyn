// config inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()


// forma de ler JSON -> utilizar middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

// rotas da API
const pessoaRotas = require('./rotas/pessoaRotas')

app.use('/pessoas', pessoaRotas)

// rota inicial ==> endpoint
app.get('/', (req,res)=>{
    // mostrar requisição
    res.json({
        message: 'Encontrei o express!'
    })
})

// entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fkxx1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
)

.then(
    ()=>{
        console.log('Conectado com sucesso!!')
        app.listen(3000)
    }
)

.catch(
    (err)=>{
        console.log(err)
    }
)
