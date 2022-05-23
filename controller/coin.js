const Coin = require('../models/coin')
const getAllCoin = async function (req, res) {
    try {
        const coin = await Coin.find().sort("cmcrank")
        res.status(200).json({ coin })



    }
    catch (error) {
        console.log(error)

    }
}
module.exports = { getAllCoin }