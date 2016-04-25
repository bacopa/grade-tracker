"use strict";

var express = require("express");
var router = express.Router();


var Grade = require("../models/grade");


router.get("/", (req, res) => {
	Grade.findAll(function (err, grades){
		if(err)return res.status(400).send(err);
		res.render('index', { grades: grades });
	});	
});


router.post("/", (req, res) => {
	Grade.create(req, err => {
		if(err) return res.status(400).send(err);

		Grade.findAll(function (err, grades){
			if(err)return res.status(400).send(err);
			res.render('index', { grades: grades });
		});
		//why can't i save this function to a variable?
		// retrieve();	
	});
});

// does the uri need the :id? --> yes it does!
router.get("/:id", (req, res) => {
	Grade.findById(req.params.id, (err, grade) => {
		if(err) return res.status(400).send(err);
		res.send(grade);
	});
});

router.delete("/:id", (req, res) => {
	Grade.delete(req.params.id, err => {
		if(err) return res.status(400).send(err);
		res.send(err);
	})
})

router.put("/:id", (req, res) => {
	Grade.update(req, err => {
		if(err){
			return res.status(400).send(err);
		}		
		res.send(err);
	})
})

module.exports = router;















