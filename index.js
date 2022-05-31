// config inicial
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
const DB_USER = 'kevynGuima'
const DB_PASSWORD = encodeURIComponent('23Qazxsw21')

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
