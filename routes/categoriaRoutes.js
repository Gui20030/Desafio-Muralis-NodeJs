const router = require('express').Router()
const { get } = require('express/lib/response')
const res = require('express/lib/response')

const Categoria = require('../api/despesas/Categorias')

//Cria dados:


router.post('/', async (req, res) => {
    
    //req.body
    
    //Exempo: tipo_pagemento_id: 1, tipo: Dinheiro

    const{id, nome, descricao} = req.body
    
    if(!id){

        res.status(422).json({error: 'A Categoria não foi incerida!'})
        return
    }

    if(!nome){

        res.status(422).json({error: 'Nome da categoria não foi incerido!'})
        return

    }

    if(!descricao){

        res.status(422).json({error: 'A descricao da categoria não foi incerida!'})
        return

    }
    
    const categoria = {
        
        id,
        nome,
        descricao,

    }

    //create

   

    try{
        
        //Criaão de dados
        await Categoria.create(categoria)
        
        res.status(201).json({message: 'Categoria cadastrada no sistema!'})

    } catch(error) {
        res.status(500).json({error: error})
    }

})

//Leitura dos dados

router.get('/', async (req, res) => {
    
    try {
        
        const categoria = await Categoria.find()
        
    res.status(200).json(categoria)

   } catch (error) {

    res.status(500).json({error: error})
    
   }
})

router.get('/:id', async (req, res) => {

    console.log(req)

    //Extrair dado solicitado - Individual
    const id = req.params.id

    try {
        
        const categoria = await Categoria.findOne({_id: id})

        if (!categoria) {

            res.status(422).json({error: 'Nome da categoria não encontrado!'})
            res.status(422).json({error: 'Verifique se o ID foi inserido corretamente!'})
            return
        }

        res.status(200).json(categoria)
    
    } catch (error) {
     
        //res.status(500).json({error: error})
        res.status(422).json({error: ('Nome da categoria não encontrado! ') + ('Verifique se o nome foi inserido corretamente!')})
        return

    }
})


//Apagar dados

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const categoria = await Categoria.findOne({_id: id})

    if (!categoria) {

        res.status(422).json({message: 'Despesa não encontrada!'})
        res.status(422).json({message: 'Verifique se o ID foi inserido corretamente!'})
        return

    }

    try {
        
        await Categoria.deleteOne({_id: id})

        res.status(200).json({message: 'Categoria apgada com sucesso!'})
    } catch (error) {

        res.status(500).json({error: error})

    }
})

module.exports = router