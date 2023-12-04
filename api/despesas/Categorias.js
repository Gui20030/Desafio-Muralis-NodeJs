const mongoose = require('mongoose')

const Categoria = mongoose.model('Categoria', {

    id: Number,
    nome: String,
    descricao: String,
    
})

module.exports = Categoria