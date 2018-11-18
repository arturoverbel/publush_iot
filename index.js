const awsIot = require('aws-iot-device-sdk');
const express = require('express')
const app = express()
const port = 3001

 
app.get('/', (req, res) => res.send('Light led'))

const device = awsIot.device({
  keyPath: 'certs/8f680e1fc3-private.pem.key',
  certPath: 'certs/8f680e1fc3-certificate.pem.crt',
  caPath: 'certs/root-CA.crt',
  region: 'us-east-1',
  clientId: 'server',
  host: 'a1io5eo0eh1c6a-ats.iot.us-east-1.amazonaws.com'
});

device.on('connect', function() {
  console.log('Connected');
});

app.get('/light/:state', function (req, res) {
    console.log("GET request")
    const state = req.params.state;

    const data = { light: state};
    console.log(data);
    device.publish('LED', JSON.stringify(data));

    res.send(data);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))