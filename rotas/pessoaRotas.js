const rotas = require('express').Router()
const { Router } = require('express')
const Pessoas = require('../models/Pessoas')

// Create - Criação de dados
rotas.post('/', async(req, res)=>{
    
    // req.body
    const { nome,salario, aprovado } = req.body
    // { nome:"anderson",salario:5000,aprovado:false }

    if(!nome) {
        res.status(422).json({ error: 'Nome é obrigatório!' })
        return
    }

    const pessoas = {
        nome,
        salario,
        aprovado
    }

    try {
        await Pessoas.create(pessoas)
        res.status(201).json({ message: 'Pessoa inserida com sucesso!' })
    } catch (error) {
        res.status(500).json({ error:error })
    }
})

// Read - Leitura de dados
rotas.get('/', async(req, res)=>{

    try{
        const pessoas = await Pessoas.find()

        res.status(200).json(pessoas)

    }catch (error) {
        res.status(500).json({ error:error })
    }

})

rotas.get('/:id', async(req, res)=>{

    // extrair dados da requisição, pela url = req.params
    const id = req.params.id

    try{
        const pessoas = await Pessoas.findOne({ _id: id })

        res.status(200).json(pessoas)
    } catch (error) {
        if (!pessoas) {
            res.status(422).json({ message: 'O usuário não foi encontrado!' })
            return
        }
    }
})

module.exports = rotas