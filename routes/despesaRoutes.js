const router = require('express').Router()
const { get } = require('express/lib/response')
const res = require('express/lib/response')

const Despesa = require('../api/despesas/Despesa')

//Cria dados:


router.post('/', async (req, res) => {
    
    //req.body
    const id = req.params.id
    //Exempo: id: 00000, valor: 120.00, data_compra: 29/11/2023, descricao: ?????, tipo_pagemento_id: 0, categoria_id: 0000
    const{valor, data_compra, descricao, tipo_pagamento_id, categoria_id} = req.body
    
    if(!valor){
        res.status(422).json({error: 'Valor da compra não foi incerido!'})
        return
    }
    if(!data_compra){
        res.status(422).json({error: 'Data da compra não foi incerida!'})
        return
    }
    if(!descricao){
        res.status(422).json({error: 'Descrição da compra não foi incerido!'})
        return
    }
    if(!tipo_pagamento_id){
        res.status(422).json({error: 'Tipo de pagamento não foi incerido!'})
        return
    }
    if(!categoria_id){
        res.status(422).json({error: 'Categoria da compra não foi incerida!'})
        return
    }
    
    const despesa = {
        
        valor,
        data_compra,
        descricao,
        tipo_pagamento_id,
        categoria_id

    }
    //create
    try{
        
        //Criaão de dados
        //"data": null,
        //"success":true,

        await Despesa.create(despesa)

        res.status(201).json({message: 'Despesa cadastrada no sistema!'})      

    } catch(error) {
        res.status(500).json({error: error})
    }

})

//Leitura dos dados

router.get('/', async (req, res) => {
    
    try {
        
        const despesa = await Despesa.find()
        
    res.status(200).json(despesa)

   } catch (error) {

    res.status(500).json({error: error})
    
   }
})

router.get('/:id', async (req, res) => {

    console.log(req)

    //Extrair dado solicitado - Individual
    const id = req.params.id

    try {
        
        const despesa = await Despesa.findOne({_id: id})

        if (!despesa) {

            res.status(422).json({error: 'Despesa não encontrada!'})
            res.status(422).json({error: 'Verifique se o ID foi inserido corretamente!'})
            return
        }

        res.status(200).json(despesa)
    
    } catch (error) {
     
        //res.status(500).json({error: error})
        res.status(422).json({error: ('Despesa não encontrada! ') + ('Verifique se o ID foi inserido corretamente!')})
        return

    }
})

//Atualiza dados:

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {valor, data_compra, descricao, tipo_pagamento_id, categoria_id} = req.body

    const despesa = {

        valor,
        data_compra,
        descricao,
        tipo_pagamento_id,
        categoria_id,

    }

    try {

        const updatedDespesa = await Despesa.updateOne({_id:id}, despesa)
        
        console.log(updatedDespesa)

        if(updatedDespesa.matchedCount == 0){

            res.status(422).json({message: 'Despesa não atualizada!'})
            res.status(422).json({message: 'Verifique se os dados foram inseridos corretamente!'})
            return
        }

        res.status(200).json(despesa)

    } catch (error) {

        res.status(500).json({error: error})
    }
})

//Apagar dados

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const despesa = await Despesa.findOne({_id: id})

    if (!despesa) {

        res.status(422).json({message: 'Despesa não encontrada!'})
        res.status(422).json({message: 'Verifique se o ID foi inserido corretamente!'})
        return

    }

    try {
        
        await Despesa.deleteOne({_id: id})

        res.status(200).json({message: 'Despesa apgada com sucesso!'})
    } catch (error) {

        res.status(500).json({error: error})

    }
})

module.exports = router

