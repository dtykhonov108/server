//import axios from 'axios'
//import CryptoJS from 'crypto-js'
//import qs from 'qs'
import express from 'express'
import cors from 'cors'
import { getDataBin } from './bin-acc-data.js'
import { getDataKun } from './kuna-wallets.js'
//import { isBaninanceBuy } from './binance-buy.js'
import { isBaninanceSell } from './binance-sell.js'
//import { orderKuna } from './kuna-order.js'

const port = 8000
const app = express()
app.use(cors())

/*
const publickApiKey = 'gWpjuWZHkfE896D44eMeLguaCv9YXVNv1K2rFv8FcLL9wz7XEUqDAWWdEruC0VHb';
const secretApi = 'GI07EgmflOGRuo6iCswMkJMKBkcQg9gZQKgwh7tfD3szpW3ytDLTj6cegw2W1OEK';
const apiPath = 'https://api.binance.com/api/v3/account';

  

const getDataBin = async () =>{

  const nonce = Date.now();

   const dataQueryString = qs.stringify({
    timestamp: nonce,
    recvWindow: 5000,
  });  

  const signature = CryptoJS.HmacSHA256(dataQueryString, secretApi);

    const response = await axios.get('https://api.binance.com/api/v3/account', {
      headers: {
        'X-MBX-APIKEY': publickApiKey,
        'Access-Control-Allow-Origin': 'https://api.binance.com',
        'Content-Type':'application/json;charset=utf-8'
       },
      params:{  
        timestamp:nonce,
        recvWindow:5000,
        signature:signature
        
      }
    });

    return response.data.balances;
  }*/
/*
 const publicKunaKey = 'CWT8HD024olV1jJySzQ3FQLz5Jo7EQQKFsriSHQx';
 const secretKunaKey = 'FROxKyXrxqxnpx3KZhxkBVGEWExt4GbCJb3yFUtT';

  const getDataKun = async () =>{

    const apiPath = '/v3/auth/r/wallets';
    const nonce = Date.now();
    const body = {};

    let signatureString = `${apiPath}${nonce}`;
    const signature = CryptoJS.HmacSHA384(signatureString, secretKunaKey);
    const sighex = signature.toString(CryptoJS.enc.Hex);

      const {data} = await axios.post('https://api.kuna.io/v3/auth/r/wallets', {
        headers: {
            'accept': 'application/json',
            'kun-nonce': nonce,
            'kun-apikey':publickKunaKey,
            'kun-signature': signature
         }
      });
      const link = {
        method: "post",
        url: "https://api.kuna.io/v3/auth/r/wallets",
        headers: {
          accept: "application/json",
          "kun-nonce": nonce,
          "kun-apikey": publicKunaKey,
          "kun-signature": sighex,
        },
      };
  
      const response = await axios(link);

      //console.log(response.data.data);
    }


  getDataKun();
  */
app.get('/data/bin', async (req, res) => {
    try {
        res.send(await getDataBin())
    } catch (e) {
        res.send(`Error ${e.message}`)
    } finally {
        res.end()
    }
})

app.post('/binc/sell', async (req, res) => {
    const symbol = req.body.symbol
    const type = req.body.type
    const quantity = req.body.quantity

    try {
        res.send(await isBaninanceSell(symbol, type, quantity))
    } catch (e) {
        res.send(`Error ${e.message}`)
    } finally {
        res.end()
    }
})

app.get('/data/kun', async (req, res) => {
    try {
        res.send(await getDataKun())
    } catch (e) {
        res.send(`Error ${e.message}`)
    } finally {
        res.end()
    }
})

app.listen(port, () => {
    console.log(`Сервер запущенний на http://localhost:${port}`)
})
