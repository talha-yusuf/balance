var request = require('request');
var express = require('express');
var app = express();

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('https://walletsecuredgoldcoin.com'));

var bodyParser = require('body-parser');
app.use(bodyParser.json({type: 'application/json'}));


var start = express.Router();
start.get('/', function(request, res){

    res.contentType('application/json');
    res.end(JSON.stringify("API is deployed"));

});
app.use('/', start);

// Get Balance
var getBalance = express.Router();
getBalance.post('/', function(request, res){

    public_key = request.body.public_address;
    var value;
    
    web3.eth.getBalance(public_key)
    .then(function(balance){
        value = web3.utils.fromWei(balance, 'ether');
        console.log(value);
        res.contentType('application/json');
        res.end(JSON.stringify(value));
    });

});
app.use('/balance', getBalance);


if (module === require.main) {
    // Start the server
    var server = app.listen(process.env.PORT || 3000, function () {
        var port = server.address().port;
        console.log('App listening on port %s', port);
    });
  }
module.exports = app;