import axios from 'axios'
import crypto from 'crypto'
import qs from 'qs'
//import CryptoJS from 'crypto-js'

const publickApiKey = 'gWpjuWZHkfE896D44eMeLguaCv9YXVNv1K2rFv8FcLL9wz7XEUqDAWWdEruC0VHb'
const secretApi = 'GI07EgmflOGRuo6iCswMkJMKBkcQg9gZQKgwh7tfD3szpW3ytDLTj6cegw2W1OEK'
const apiPath = 'https://api.binance.com/api/v3/account'

/*
const getDataBin = async () => {
    const nonce = Date.now()

    const dataQueryString = qs.stringify({
        timestamp: nonce,
        recvWindow: 5000,
    })

    const signature = CryptoJS.HmacSHA256(dataQueryString, secretApi)

    const response = await axios.get('https://api.binance.com/api/v3/account', {
        headers: {
            'X-MBX-APIKEY': publickApiKey,
            'Access-Control-Allow-Origin': 'https://api.binance.com',
            'Content-Type': 'application/json;charset=utf-8',
        },
        params: {
            timestamp: nonce,
            recvWindow: 5000,
            signature: signature,
        },
    })

    return response.data.balances
}*/

const getDataBin = async () => {
    try {
        const nonce = Date.now()

        const dataQueryString = qs.stringify({
            timestamp: nonce,
            recvWindow: 5000,
        })

        const signature = crypto.createHmac('sha256', secretApi).update(dataQueryString).digest('hex')

        const link = {
            method: 'GET',
            url: 'https://api.binance.com/api/v3/account',
            headers: {
                'X-MBX-APIKEY': publickApiKey,
                'Access-Control-Allow-Origin': 'https://api.binance.com',
                'Content-Type': 'application/json;charset=utf-8',
            },
            params: {
                timestamp: nonce,
                recvWindow: 5000,
                signature: signature,
            },
        }

        const response = await axios(link)
        return response.data.balances
    } catch (e) {
        console.log(e.message)
    }
}

//getDataBin()

export { getDataBin }
