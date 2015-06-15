"use strict";

var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var db;

function createDb(fAction) {
	db = new sqlite3.Database('small_machines.db', fAction);
}

function getAll(res) {
	var sSQL = "SELECT stock.stockid, stock.name as name, stock.max, SUM(sales.quantity) as taken FROM stock LEFT JOIN sales ON(stock.stockid = sales.stockid) GROUP BY stock.stockid;";
	db.all( sSQL, function(err, rows) {
		rows = rows.map(function(row){
		    if(!row.taken) {
		        row.taken = 0;
		    }
		    return row;
		});
		res.render('stock_list', {
		    title:"Current Stock",
		    sSQL:sSQL,
		    rows:rows
		});
		closeDb();
	});
}

function getSales(res) {
	var sSQL = "SELECT * FROM sales;";
	db.all( sSQL, function(err, rows) {
		res.render('sales_list', {
		    title:"Sales List",
		    sSQL:sSQL,
		    rows:rows
		});
		closeDb();
	});
}

function getSalesReport(res) {
	var sSQL = "SELECT users.username, users.fullname, stock.name, SUM(sales.quantity) as quantity FROM stock JOIN sales ON (stock.stockid = sales.stockid) JOIN users ON (users.userid = sales.userid) GROUP BY  users.username, stock.name;";
	db.all( sSQL, function(err, rows) {
		res.render('sales_report', {
		    title:"Sales Report",
		    sSQL:sSQL,
		    rows:rows
		});
		closeDb();
	});
}


function getAllJson(res) {
	var sSQL = "SELECT stock.stockid, stock.name as name, stock.max, SUM(sales.quantity) as taken FROM stock LEFT JOIN sales ON(stock.stockid = sales.stockid) GROUP BY stock.stockid;";
	db.all(sSQL, function(err, rows) {
	    rows = rows.map(function(row){
		    if(!row.taken) {
		        row.taken = 0;
		    }
		    return row;
		});
		
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
    var sSQL = "SELECT stock.stockid, stock.name as name, stock.max, SUM(sales.quantity) as taken FROM stock LEFT JOIN sales ON(stock.stockid = sales.stockid) GROUP BY stock.stockid;";
	db.all(sSQL, function(err, rows) {
	        var aOut = rows.map(function(item){
                        
                    if(!item.taken) {
                        item.taken = 0;
                    }
                    
                    return item.taken;
                });
                
                var sOut = JSON.stringify(aOut);
                res.send(sOut);
                //closeDb();
        });
}


function book(res, req) {
	console.log(req);
	var id = req.query.stockid;
	var userid = req.query.userid;
	
	db.run("INSERT INTO sales (userid, stockid, quantity) VALUES ((?), (?), 1);", userid, id);
  	getTaken(res);
}

function cancel(res, req) {
	var id = req.query.stockid;
	var userid = req.query.userid;
	db.run("INSERT INTO sales (userid, stockid, quantity) VALUES ((?), (?), -1);", userid, id);
  	
	getTaken(res);
}


function closeDb() {
	db.close();
}

router.get('/', function(req, res, next) {
   	createDb(getAll.bind(this, res));
});

router.get('/sales', function(req, res, next) {
   	createDb(getSales.bind(this, res));
});

router.get('/salesreport', function(req, res, next) {
   	createDb(getSalesReport.bind(this, res));
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
