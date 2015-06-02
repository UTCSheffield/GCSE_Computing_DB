/**
 * Shows how to use chaining rather than the `serialize` method.
 */
"use strict";

var sqlite3 = require('sqlite3').verbose();
var db;

function createDb(fAction) {
    console.log("createDb chain");
    db = new sqlite3.Database('small_machines.db', fAction);
}

function readAllRows() {
    console.log("readAllRows lorem");
    db.all("SELECT * FROM stock", function(err, rows) {
            console.log("rows =", rows);
            var out = rows.map(function(item){return item.max;});
            console.log("out =", out);
        closeDb();
    });
}

function closeDb() {
    console.log("closeDb");
    db.close();
}

function runChainExample() {
    createDb(readAllRows);
}

runChainExample();
