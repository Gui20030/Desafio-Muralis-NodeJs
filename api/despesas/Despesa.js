const mongoose = require('mongoose')

const Despesa = mongoose.model('Despesa', {
    
    id: Number,
    valor: Number,
    data_compra: String,
    descricao: String,
    tipo_pagamento_id: Number,
    categoria_id: Number,

})

module.exports = Despesa