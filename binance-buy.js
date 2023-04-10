import axios from 'axios'
import crypto from 'crypto'
import qs from 'qs'

const publickApiKey =
const secretApi = 
const apiPath = 'https://api.binance.com/api/v3/account'

const isBaninanceBuy = async () => {
    const nonce = Date.now()
    const dataQueryString = qs.stringify({
        timestamp: nonce,
        recvWindow: 5000,
        symbol: 'BTCUSDT',
        side: 'BUY',
        type: 'MARKET',
        quantity: 0.001,
    })

    const signature = crypto.createHmac('sha256', secretApi).update(dataQueryString).digest('hex')

    const link = {
        method: 'POST',
        url: 'https://api.binance.com/api/v3/order',
        headers: {
            'X-MBX-APIKEY': publickApiKey,
            'Access-Control-Allow-Origin': 'https://api.binance.com',
            'Content-Type': 'application/json;charset=utf-8',
        },
        params: {
            timestamp: nonce,
            recvWindow: 5000,
            symbol: 'BTCUSDT',
            side: 'BUY',
            type: 'MARKET',
            quantity: 0.001,
            signature: signature,
        },
    }

    const response = await axios(link)
    console.log(response.data)
}

//isBaninanceBuy()

export { isBaninanceBuy }
