 const axios = require('axios');
const  CryptoJS = require("crypto-js");
//import qs from 'qs';
//import express from 'express';
//import cors from 'cors';

const publicKunaKey = 'CWT8HD024olV1jJySzQ3FQLz5Jo7EQQKFsriSHQx';
    const secretKunaKey = 'FROxKyXrxqxnpx3KZhxkBVGEWExt4GbCJb3yFUtT';

const getDataKun = async () =>{

    const apiPath = '/v3/auth/r/wallets';
    const nonce = Date.now();
    const body = {};

    let signatureString = `${apiPath}${nonce}`;
    const signature = CryptoJS.HmacSHA384(signatureString, secretKunaKey);
    const sighex = signature.toString(CryptoJS.enc.Hex);

      /*const {data} = await axios.post('https://api.kuna.io/v3/auth/r/wallets', {
        headers: {
            'accept': 'application/json',
            'kun-nonce': nonce,
            'kun-apikey':publickKunaKey,
            'kun-signature': signature
         }
      });*/
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

     // console.log(response.data);
    }
    getDataKun();