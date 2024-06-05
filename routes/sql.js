"use strict";

var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db;
var fs = require("fs");

function createDb(fAction) {
	db = new sqlite3.Database('small_machines.db', fAction);
}

function createSQL(res) {
	var sSQL = fs.readFileSync("small_machines.sql").toString();
	//console.log("sSQL =", sSQL);
	db.exec(sSQL);
    	var sTitle = "Create the tables";
	showStock(res, sSQL, sTitle, "create_sql");
}

/*function createSQL(res) {
	var sSQL = fs.readFileSync("small_machines.sql").toString();
	console.log("sSQL =", sSQL);
    
	db.run(sSQL);
	res.render('create_sql', {
		    title:"SQL to Create Database Structure",
		    sSQL:sSQL
		});
}*/


function insertSQL(res) {
	var sSQL = 'INSERT INTO stock (name, max) VALUES ("Catapult", 5);';
	var sTitle = "INSERT";
	db.run(sSQL);
	showStock(res, sSQL, sTitle, "insert");
}


function updateSQL(res) {
	var sSQL = 'UPDATE stock SET max = 60 WHERE stockid = 6;';
	var sTitle = "UPDATE";
	db.run(sSQL);
	showStock(res, sSQL, sTitle, "update");
}


function insertionSQL(res, sWHERE) {

	var sTitle = "Insertion Attack";
	var sSQL = 'UPDATE stock SET max = 60 WHERE stockid = '+ sWHERE;

	var sTemplate = "insertion";
	
	db.exec( sSQL, function(err, rows) {
		showStock(res, sSQL, sTitle, sTemplate);
	});
}

function sanitisationSQL(res, sStockid) {

	var sTitle = "Data Sanitisation";

	var sSQL = 'UPDATE stock SET max = 60 WHERE stockid = ?';

	var sTemplate = "sanitisation";
	const stockid = Number.parseInt(sStockid, base);
  	if (Number.isNaN(stockid)) {
		res.render('error', {
			title:"HTTP 500 : Error Page",
			message: "Hacking attempt likely",
		    sSQL:sSQL,
			error:{status:500, stack: sSQL + " : "+ sStockid}
		})
		return null;
	}
	var stmt = db.prepare('SELECT * FROM users WHERE id=?');
	var row = stmt.get(stockid);
	
	
	db.exec( sSQL.replace("?", sStockid), function(err, rows) {
		
		showStock(res, sSQL, sTitle, sTemplate);
	});
}


function deleteSQL(res) {
	var sSQL = 'DELETE FROM stock WHERE stockid >= 6;';
	var sTitle = "DELETE";
	db.run(sSQL);
	showStock(res, sSQL, sTitle, "delete");
}


function showStock(res, sSQL, sTitle, sTemplate) {
    var sSelectSQL = "SELECT * FROM stock;";
	db.all( sSelectSQL, function(err, rows) {
		res.render(sTemplate, {
		    title:sTitle,
		    sSQL:sSQL,
		    sSelectSQL: sSelectSQL,
		    rows:rows
		});
		closeDb();
	});
}




function whereSQL(res, sWHERE) {
	var sTitle = "WHERE";
	var sTemplate = "where";
	var sSelectSQL = "SELECT * FROM stock";
	if(sWHERE) {
	    sSelectSQL = sSelectSQL + " WHERE "+ sWHERE;
	}
	
	db.all( sSelectSQL, function(err, rows) {
		res.render(sTemplate, {
		    title:sTitle,
		    sSelectSQL: sSelectSQL,
		    rows:rows
		});
		closeDb();
	});
}



function closeDb() {
	db.close();
}

router.get('/', function(req, res, next) {
    createDb(createSQL.bind(this, res));
    /*var sSQL = fs.readFileSync("small_machines.sql").toString();
    res.render('create_sql', {
        title:"SQL to Create Database Structure",
        sSQL:sSQL
    });*/
});

router.get('/insert', function(req, res, next) {
   	createDb(insertSQL.bind(this, res));
});

router.get('/update', function(req, res, next) {
   	createDb(updateSQL.bind(this, res));
});

router.get('/delete', function(req, res, next) {
   	createDb(deleteSQL.bind(this, res));
});

router.get('/insertion', function(req, res, next) {
    var sWhere = "2";
	if(req.query.where){
		sWhere = req.query.where
	}
    
   	createDb(insertionSQL.bind(this, res, sWhere));
});


router.get('/sanitisation', function(req, res, next) {
    var stockid = "2";
	if(req.query.stockid){
		stockid = req.query.stockid
	}
    
   	createDb(sanitisationSQL.bind(this, res, stockid));
});

router.get('/where', function(req, res, next) {
    var sWhere = req.query.where;
   	createDb(whereSQL.bind(this, res, sWhere));
});


/*router.get('/create', function(req, res, next) {
   	createDb(createSQL.bind(this, res));
});*/


module.exports = router;
