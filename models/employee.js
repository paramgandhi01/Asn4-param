// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// EmpSchema = new Schema({
//     name : String,
//     salary : Number,
// 	age : Number
// });
// module.exports = mongoose.model('Employee', EmpSchema);

 saleSchema = new Schema({
    "Invoice ID": String,
    Branch: String,
    City: String,
    "Customer type": String,
    "Product line": String,
    name: String,
    image: String,
    "Unit price": Number,
    Quantity: Number,
    "Tax 5%": Number,
    Total: Number,
    Date: String,
    Time: String,
    Payment: String,
    cogs: Number,
    "gross income": Number,
    Rating: Number
}, { collection: 'sale' }); ;
module.exports = mongoose.model('sale', saleSchema);
