var express = require('express');
var https = require('https');
var http = require('http');
var app = express();
var warehouse = require('warehousejs');
var SqlBackend = require('warehousejs/backend/sql');
 
var options = {
    driver: 'sqlite3',
    filename: 'small_machines.db',
};
 

var backend = new SqlBackend(options),
    store = backend.objectStore('item'); 
 
var app = express();

warehouse.applyRoutes(app, store);

http.createServer(app).listen(80);
