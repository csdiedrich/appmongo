var mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost:27017/helloworld");
//mongoose.connect("mongodb://mongodaniel2:casabonita@ds159200.mlab.com:59200/mongodaniel");
mongoose.connect("mongodb://umbleruser:senha_MONGO2017@162.243.197.221:27017/umbler");

var customerSchema = new mongoose.Schema({
    nome: String,
    idade: Number
}, { collection: 'customers' }
);

module.exports = { Mongoose: mongoose, CustomerSchema: customerSchema }
