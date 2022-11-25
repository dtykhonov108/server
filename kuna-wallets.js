import axios from 'axios'
import crypto from 'crypto'

const publicKunaKey = '76xzhbOd4FxejbO9wpGBbc2M3g2L5AkBxUdF5Cm9'
const secretKunaKey = 'y9zlsWCRnihBAuQKrXuhMZEkcxTmMpI7AvHYWxRh'

const getDataKun = async () => {
    try {
        const apiPath = '/v3/auth/r/wallets'
        const nonce = Date.now()
        const body = {}

        let signatureString = `${apiPath}${nonce}${JSON.stringify(body)}`
        const signature = crypto.createHmac('sha384', secretKunaKey).update(signatureString).digest('hex')

        const link = {
            method: 'POST',
            url: 'https://api.kuna.io/v3/auth/r/wallets',
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

        return response.data
    } catch (e) {
        console.log(e.message)
    }
}
//getDataKun()

export { getDataKun }
