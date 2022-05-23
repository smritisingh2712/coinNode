const { getAllCoin } = require('../controller/coin')


const express = require('express')
const router = express.Router()
router.route('/alldata').get(getAllCoin);

module.exports = router