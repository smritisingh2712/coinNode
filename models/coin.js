const mongoose = require('mongoose')

const CoinSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide rating']
    },
    price: {
        type: Number,
        trim: true,
        required: [true, 'Please provide review title']
    },
    Symbol: {
        type: String
    },
    hour24: {
        type: Number,
        required: [true, 'Please provide review text'],
        maxlength: 100,

    },
    days7: {
        type: Number,

        required: true
    },
    MarketCap: {
        type: Number,
        ref: 'Product',
        required: true
    },
    volume: {
        type: Number
    },
    CirculatingSupply: {
        type: Number

    },
    cmcrank: {
        type: Number
    }
}, { timestamps: true })




module.exports = mongoose.model('Coin', CoinSchema)

