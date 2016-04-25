'use strict';

var db = require('../config/db');
var uuid = require('uuid');
var moment = require("moment");
var date = moment().format("MMM Do YY");



 db.run('CREATE TABLE IF NOT EXISTS grades (id text, name TEXT, assignment TEXT, score TEXT, total TEXT, letter TEXT)');


exports.findAll = function(cb) {
	db.all('SELECT * FROM grades', cb);

}

exports.create = function(req, cb) {
	db.serialize(function () {
		var stmt = db.prepare("INSERT INTO grades VALUES (?, ?, ?, ?, ?, ?)")
		stmt.run( uuid(), req.body.name, req.body.assignment, req.body.score, req.body.total, req.body.letter);
		stmt.finalize(cb); 	
	})
}

exports.findById = function(id, cb) {
	db.each("SELECT * FROM grades WHERE id = ?", id,
		cb)
}

exports.delete = function(id, cb) {
	db.run("DELETE FROM grades WHERE id = ?", id, cb)
}

exports.update = function(req, cb) {

	db.run("UPDATE grades SET name = ?, assignment = ?, score = ?, total = ?, letter = ? WHERE id = ?", 

		[ req.body.name, req.body.assignment, req.body.score, req.body.total, req.body.letter, req.params.id ], 
		cb
		)
}



