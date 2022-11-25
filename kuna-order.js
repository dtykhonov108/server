import axios from 'axios'
import crypto from 'crypto'

const publicKunaKey = 'DUSlZgdmz9gXb6TZOe1DJA8NJEyNKX5aYnFtZ36o'
const secretKunaKey = 'KKNjWht571nAbT6fOtLyx4Zs5xh5FCKxBZWTx3eo'

const orderKuna = async () => {
    const apiPath = '/v3/auth/w/order/submit'
    const nonce = Date.now()
    const body = {
        symbol: 'btcusdt',
        type: 'market',
        amount: '1',
    }

    let signatureString = `${apiPath}${nonce}${JSON.stringify(body)}`
    const signature = crypto.createHmac('sha384', secretKunaKey).update(signatureString).digest('hex')

    const link = {
        method: 'POST',
        url: 'https://api.kuna.io/v3/auth/w/order/submit',
        data: JSON.stringify(body),
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'kun-nonce': nonce,
            'kun-apikey': publicKunaKey,
            'kun-signature': signature,
        },
    }

    const response = await axios(link)

    console.log(response.data)
}
//orderKuna()

export { orderKuna }
