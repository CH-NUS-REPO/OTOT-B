const functions = require('@google-cloud/functions-framework');
const axios = require('axios');

const exchangeURL = 'https://api.exchangerate.host/latest';

async function queryCurrency() {
    const response = await axios.get(exchangeURL);
    return response.data
}

functions.http('asianCurrency', async (req, res) => {
    let currencies;
    try {
        currencies = await queryCurrency();
    } catch (err) {
        return res.status(500).send('Failed to query currency API');
    }
    
    const retval = {'rates': {}};
    retval['rates']['MYR'] = currencies['rates']['MYR'];
    retval['rates']['SGD'] = currencies['rates']['SGD'];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(retval);
});
