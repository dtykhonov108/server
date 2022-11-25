import axios from 'axios'
import crypto from 'crypto'
import qs from 'qs'

const publickApiKey = 'H303cdkQ7f6Na9EeXHQez6aVaBQ0Q5fUDGYSXRK1LpXmCUdV2TvZGPcWP87EZTMX'
const secretApi = 'IwXXgZqabGjrklz49GRnBDCWn7NMQQh8hLyZLpX4dPYs7gPGt1xyHZ7Oo1cDyRzf'
const apiPath = 'https://api.binance.com/api/v3/account'

const isBaninanceSell = async (symbol, type, quantity) => {
    const nonce = Date.now()
    const dataQueryString = qs.stringify({
        timestamp: nonce,
        recvWindow: 5000,
        symbol: symbol,
        side: 'SELL',
        type: type,
        quantity: quantity,
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
            symbol: symbol,
            side: 'SELL',
            type: type,
            quantity: quantity,
            signature: signature,
        },
    }

    const response = await axios(link)

    console.log(response.data)
}

//isBaninanceSell()

export { isBaninanceSell }
