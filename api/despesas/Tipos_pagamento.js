const mongoose = require('mongoose')

const Tipo_pagamento = mongoose.model('Tipo_pagamento', {

   tipo_pagamento_id: Number,
   tipo: String

})

module.exports = Tipo_pagamento