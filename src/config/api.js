require('dotenv/config');

const axios = require('axios');
const api = axios.create({
    baseURL: process.env.API_CRYPTO_URL,
  });

module.exports = api