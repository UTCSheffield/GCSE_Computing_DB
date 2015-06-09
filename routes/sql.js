"use strict";

var express = require('express');
var router = express.Router();
var Handlebars = require("hbs");
var sqlite3 = require('sqlite3').verbose();
var db;
var fs = require("fs");

function createDb(fAction) {
	db = new sqlite3.Database('small_machines.db', fAction);
}

function createSQL(res) {
	var sSQL = fs.readFileSync("small_machines.sql").toString();
	console.log("sSQL =", sSQL);
    
	db.run(sSQL);
	res.render('create_sql', {
		    title:"SQL to Create Database Structure",
		    sSQL:sSQL
		});
	
}

function closeDb() {
	db.close();
}

router.get('/', function(req, res, next) {
    var sSQL = fs.readFileSync("small_machines.sql").toString();
    res.render('create_sql', {
        title:"SQL to Create Database Structure",
        sSQL:sSQL
    });
});

/*router.get('/create', function(req, res, next) {
   	createDb(createSQL.bind(this, res));
});*/


module.exports = router;
