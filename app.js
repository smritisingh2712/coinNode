//const express = require('express');
//const app = express();
require('dotenv').config();
const Coin = require('./models/coin')
const cors=require('cors');
//db connection
const connectDB = require('./db/connect')
const coinRouter = require('./routes/coinrouter')
//app.use(express.json());
//-----------------
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
require('dotenv').config();
app.use(express.json());
app.use( cors() )
const apiKey = process.env.API_KEY;

let coins = [];
let fifteenMin = 900000;

setInterval(() => {
    fetchCoins();
}, fifteenMin);

app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

const fetchCoins = async function () {
    try {
	await Coin.deleteMany();
        const response = await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${apiKey}`);
        coins = response.data.data;
        console.log(coins.length)
        console.log("----------------")
        for (i = 0; i < 100; i++) {
            const coin = new Coin({
                name: coins[i]['name'],
                Symbol: coins[i]["symbol"],
                price: coins[i]["quote"]["USD"]["price"],
                hour24: coins[i]["quote"]["USD"]["percent_change_24h"],
                days7: coins[i]["quote"]["USD"]["percent_change_7d"],
                MarketCap: coins[i]["quote"]["USD"]["market_cap"],
                volume: coins[i]["quote"]["USD"]["volume_24h"],
                CirculatingSupply: (coins[i]["circulating_supply"]),
                cmcrank: coins[i]["cmc_rank"]
            })
            coin.save();

        }
    }
    catch (error) {
        console.log("data is not added")
    }
}

// app.get('/api/coins', (request, response) => {
//     try {
//         response.json({ "length": coins.length, coins });
//     } catch (error) {
//         console.log(error.message);
//     }
// });
app.use('/api/coins',coinRouter)

fetchCoins();

//---------------















const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();