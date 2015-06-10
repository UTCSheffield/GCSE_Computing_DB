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
	console.log("sSQL =", sSQL);
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

router.get('/where', function(req, res, next) {
    var sWhere = req.query.where;
   	createDb(whereSQL.bind(this, res, sWhere));
});


/*router.get('/create', function(req, res, next) {
   	createDb(createSQL.bind(this, res));
});*/


module.exports = router;
