"use strict";

var express = require('express');
var router = express.Router();
//var hbs = require("handlebars");
var sqlite3 = require('sqlite3').verbose();
var db;

function createDb(fAction) {
	db = new sqlite3.Database('small_machines.db', fAction);
}

function getAll(res) {
	db.all("SELECT * FROM stock", function(err, rows) {
		var sOut = "<html><body><table><tr><th>stockid</th><th>Name</th><th>max</th><th>taken</th></tr>";
		var aOut = rows.map(function(row){
			return "<tr><td>"+row.stockid+"</td><td>"+row.name+"</td><td>"+row.max+"</td><td>"+row.taken+"</td></tr>";
		});

		var sOut = sOut+aOut.join("\n")+"</table></body></html>";
		res.send(sOut);
		closeDb();
	});
}

function getAllJson(res) {
	db.all("SELECT * FROM stock", function(err, rows) {
		var sOut = JSON.stringify(rows, null, 4);
		res.send(sOut);
		closeDb();
	});
}

function getMaxes(res) {
	db.all("SELECT * FROM stock", function(err, rows) {
		var aOut = rows.map(function(item){return item.max;});
		var sOut = JSON.stringify(aOut);
		res.send(sOut);
		//closeDb();
	});
}

function getTaken(res) {
        db.all("SELECT * FROM stock", function(err, rows) {
                var aOut = rows.map(function(item){return item.taken;});
                var sOut = JSON.stringify(aOut);
                res.send(sOut);
                //closeDb();
        });
}


function book(res, req) {
	console.log(req);
	var id = req.query.id ;
	db.run("UPDATE stock SET taken = taken + 1 WHERE stockid=(?)", id);
  	getTaken(res);
}

function cancel(res, req) {
	var id = req.query.id ;
	db.run("UPDATE stock SET taken = taken - 1 WHERE stockid=(?)", id);
  	getTaken(res);
}


function closeDb() {
	db.close();
}

router.get('/', function(req, res, next) {
   	createDb(getAll.bind(this, res));
});

router.get('/max', function(req, res, next) {
        createDb(getMaxes.bind(this, res));
});

router.get('/taken', function(req, res, next) {
        createDb(getTaken.bind(this, res));
});

router.get('/book', function(req, res, next) {
	
        createDb(book.bind(this, res, req));
});

router.get('/cancel', function(req, res, next) {
        createDb(cancel.bind(this, res, req));
});

module.exports = router;
