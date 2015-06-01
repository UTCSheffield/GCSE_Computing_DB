var express = require('express'),
    warehouse = require('warehouse'),
var SqlBackend = require('warehouse/backend/sql');
 
var options = {
    driver: 'sqlite3',
    filename: 'small_machines.db',
};
 

var backend = new SqlBackend(options),
var store = backend.objectStore('item'); 
 
var app = express.createServer();
 
warehouse.applyRoutes(app, store);
 
app.listen(80);
