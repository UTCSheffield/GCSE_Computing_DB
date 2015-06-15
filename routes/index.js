var express = require('express');
var router = express.Router();
var os = require("os");

/* GET home page. */
router.get('/', function(req, res, next) {
  var oInterfaces = os.networkInterfaces();
  var oNetworks = oInterfaces.eth0;
  if(!oNetworks) {
      oNetworks = oInterfaces.lo;
  }
  if(!oNetworks) {
      oNetworks = oInterfaces.wlan0;
  }
  
  var oIPv4 = oNetworks.filter(function(oAddr){
    return oAddr.family === 'IPv4';
  });
  
  var dns = require("dns");
  var dnsHostName = "google.co.uk";
  dns.lookup(dnsHostName, function(err, address, family){
      //console.log("family =", family);
      //console.log("address =", address);
      res.render('index', {
          title: 'GCSE Computing Databases',
          clientIP: req.ip,
          serverIP: oIPv4[0].address,
          dnsHostName:dnsHostName,
          dnsIP:address
      });
  });
});


router.get('/design/', function(req, res, next) {
  res.render('design', {
      title: 'Small Machines Design'
  });
});

module.exports = router;
