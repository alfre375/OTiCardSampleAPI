const express = require('express')
const app = express()
const port = 1215
const http = require('http')
const fs = require('fs')
const request = require('request');
const bodyParser = require('body-parser');
const env = require('dotenv')

function sendRequest(json, apiType) {
    let url = 'http://' + process.env.IP + ':' + process.env.PORT + '/api/' + apiType;
    console.log(`Sending to ${url}...`)
    request.post(
        url,
        json, //{ json: { key: 'value' } },
        function (error, response, body) {
            //console.log(response)
            if (error) {
                console.error(error)
            }
            if (!error && response.statusCode == 200) {
                try {
                    tid = body.split(':')[1].split('\n')[0]
                    console.log('TID:' + tid);
                } catch {
                    console.log('Couldn\'t find tid')
                }
                return body
            } else if (response) {
                console.log(response.statusCode)
            } else {
                console.error('Error 599: No response from server')
            }
        }
    );
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send(fs.readFileSync('index.html').toString()).status(200)
})

app.post('/charge', (req, res) => {
    let amount;
    let currency;
    let magstripeId;

    amount = req.body.amount;
    currency = req.body.currency;
    magstripeId = req.body.magstripeId;

    let json = { json: { sellerKey: process.env.OTICARDKEY, magstripeId: magstripeId,
    amount: amount, currency: currency, nip: req.body.nip } };
    //console.log('Sending REQ')
    body = sendRequest(json, 'charge')

    if (body) {
        res.status(200).send(body)
        return
    }
    res.status(200).redirect('/')
})

app.listen(port, () => {console.log('API test running on port ',port)})