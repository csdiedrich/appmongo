var express = require('express');
var router = express.Router();
var Chance = require('chance');
var chance = new Chance();

/* GET cadastro */
router.get('/:id?', function(req, res, next) {
  if(req.params.id){
  	var db = require('../db');
    var customers = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    customers.find({ _id: req.params.id }).lean().exec(function (e, docs) {
        res.render('cadastromuitos', { title: 'Express', customer: docs[0] });
    });
  }else
  	res.render('cadastromuitos', { title: 'Express', customer: {nome:"", idade:"", _id:""} });
});

/* POST cadastro */
router.post('/', function(req, res, next) {
    var db = require("../db");
    var nome = req.body.txtNome;
    var idade = req.body.txtIdade;

    var Customer = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    
    if(req.body.id === "") {
		let done = 1;
		const size = 10000
		for (let i = 0; i<size; i++)
		{
			console.log(i);
			let randomIdade = chance.age();
			let randomNome = chance.name();
			let customer = new Customer({ nome: randomNome, idade: randomIdade });
			customer.save(function (err) {
				console.log(randomIdade + '  ' + randomNome)
				if (err) {
					console.log("Error! " + err.message);
					return err;
				}
				else {
					done++;
					if (done == size) {
						finallyDone();
					}
				}
			});
			
		}
		finallyDone = function() {
			console.log("Everything is saved")
			res.redirect("/");
		}
		//res.redirect("/");
		
    }
    else {
    	Customer.findOneAndUpdate({ _id: req.body.id }, 
    							  { nome: nome, idade: idade }, 
    							  { upsert: false }, 
    							  function (err, doc) {
        	if (err) {
            	console.log("Error! " + err.message);
            	return err;
        	}
        	console.log("Post saved");
        	res.redirect("/");
    	});
    }
});

module.exports = router;
