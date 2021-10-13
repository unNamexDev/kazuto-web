const mongoose = require('mongoose')

const Prefix = new mongoose.Schema({

    id: String,
    prefix: String

})

module.exports = mongoose.model('Prefix', Prefix)