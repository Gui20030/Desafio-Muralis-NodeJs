const router = require('express').Router()
const { get } = require('express/lib/response')
const res = require('express/lib/response')

const Tipo_pagamento = require('../api/despesas/Tipos_pagamento')

//Cria dados:


router.post('/', async (req, res) => {
    
    //req.body
    
    //Exempo: tipo_pagemento_id: 1, tipo: Dinheiro

    const{tipo_pagamento_id, tipo} = req.body
    
    if(!tipo_pagamento_id){

        res.status(422).json({error: 'ID do tipo de pagamento não foi incerido!'})
        return
    }

    if(!tipo){

        res.status(422).json({error: 'Tipo de pagamento não foi incerido!'})
        return

    }
    
    const tipo_pagamento = {
        
        tipo_pagamento_id,
        tipo,

    }

    //create

   

    try{
        
        //Criaão de dados
        await Tipo_pagamento.create(tipo_pagamento)
        
        res.status(201).json({message: 'Pagamento cadastrado no sistema!'})

    } catch(error) {
        res.status(500).json({error: error})
    }

})

//Leitura dos dados

router.get('/', async (req, res) => {
    
    try {
        
        const tipo_pagamento = await Tipo_pagamento.find()
        
    res.status(200).json(tipo_pagamento)

   } catch (error) {

    res.status(500).json({error: error})
    
   }
})

router.get('/:id', async (req, res) => {

    console.log(req)

    //Extrair dado solicitado - Individual
    const id = req.params.id

    try {
        
        const tipo_pagamento = await Tipo_pagamento.findOne({tipo_pagamento_id: id})

        if (!tipo_pagamento) {

            res.status(422).json({error: 'Tipo de pagamento não encontrado!'})
            res.status(422).json({error: 'Verifique se o ID foi inserido corretamente!'})
            return
        }

        res.status(200).json(tipo_pagamento)
    
    } catch (error) {
     
        //res.status(500).json({error: error})
        res.status(422).json({error: ('Tipo de pagamento não encontrado! ') + ('Verifique se o ID foi inserido corretamente!')})
        return

    }
})


//Apagar dados

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const tipo_pagamento = await Tipo_pagamento.findOne({tipo_pagamento_id: id})

    if (!tipo_pagamento) {

        res.status(422).json({message: 'Tipo de pagamento não encontrado!'})
        res.status(422).json({message: 'Verifique se o ID foi inserido corretamente!'})
        return

    }

    try {
        
        await Tipo_pagamento.deleteOne({_id: id})

        res.status(200).json({message: 'Tipo de pagamento apgado com sucesso!'})
    } catch (error) {

        res.status(500).json({error: error})

    }
})

module.exports = router