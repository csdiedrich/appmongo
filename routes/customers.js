var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = require("../db");
   var customers = db.Mongoose.model('customers', db.CustomerSchema, 'customers');
   customers.find({}).lean().exec(
      function (e, docs) {
         res.render('customers', { "title": "Customers", "customers": docs });
   });
});

module.exports = router;
