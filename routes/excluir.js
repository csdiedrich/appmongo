var express = require('express');
var router = express.Router();

/* GET excluir */
router.get('/:id', function(req, res, next) {
  
  	var db = require('../db');
    var customers = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
    customers.find({ _id: req.params.id }).remove(function (err) {
        if(err){
        	console.log("Error! " + err.message);
            return err;
        }
        res.redirect('/');
    });
});

module.exports = router;
