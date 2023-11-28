var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
const exphbs = require('express-handlebars');
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
var path = require('path'); // importing the path module
const hbs = exphbs.create();

// Register the helper
hbs.handlebars.registerHelper('getProperty', function(obj, key) {
    return obj[key];
});
var port     = process.env.PORT || 8000;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
//using handlebars as view engine and telling the express the extension of it
app.engine('.hbs', exphbs.engine({ extname: '.hbs', })); 
app.set('view engine', 'hbs');


mongoose.connect(database.url);

// var Employee = require('./models/employee');
var Sale=require('./models/employee');
 
 
//get all employee data from db
app.get('/api/employees', function(req, res) {
	// use mongoose to get all todos in the database
	// Employee.find(function(err, employees) {
	// 	// if there is an error retrieving, send the error otherwise send data
	// 	if (err)
	// 		res.send(err)
	// 	res.json(employees); // return all employees in JSON format
	// });
    Employee.find()
    .then(employees => {
        // if there is an error retrieving, send the error otherwise send data
        res.json(employees); // return all employees in JSON format
    })
    .catch(err => {
        res.send(err);
    });
});

// get a employee with ID of 1
app.get('/api/employees/:employee_id', function(req, res) {
	let id = req.params.employee_id;
	// Employee.findById(id, function(err, employee) {
	// 	if (err)
	// 		res.send(err)
 
	// 	res.json(employee);
	// });
    Employee.findById(id)
    .then(employee => {
        if (!employee) {
            
            res.status(404).json({ error: 'Employee not found' });
        } else {
            // return record if the id is valid
            res.json(employee);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'Internal Server Error' });
    });
 
});


// create employee and send back all employees after creation
app.post('/api/employees', function(req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

	// Employee.create({
	// 	name : req.body.name,
	// 	salary : req.body.salary,
	// 	age : req.body.age
	// }, function(err, employee) {
	// 	if (err)
	// 		res.send(err);
 
	// 	// get and return all the employees after newly created employe record
	// 	Employee.find(function(err, employees) {
	// 		if (err)
	// 			res.send(err)
	// 		res.json(employees);
	// 	});
	// });
    Employee.create({
        name: req.body.name,
        salary: req.body.salary,
        age: req.body.age
    })
    .then(employee => {
        // get and return all the employees after newly created employee record
        Employee.find()
            .then(employees => {
                res.json(employees);
            })
            .catch(err => {
                res.send(err);
            });
    })
    .catch(err => {
        res.send(err);
    });

 
});


// create employee and send back all employees after creation
app.put('/api/employees/:employee_id', function(req, res) {
	// create mongose method to update an existing record into collection
    console.log(req.body);

	let id = req.params.employee_id;
	var data = {
		name : req.body.name,
		salary : req.body.salary,
		age : req.body.age
	}

	// save the user
	// Employee.findByIdAndUpdate(id, data, function(err, employee) {
	// if (err) throw err;

	// res.send('Successfully! Employee updated - '+employee.name);
	// });
    Employee.findByIdAndUpdate(id, data, { new: true })
        .then(employee => {
            if (!employee) {
                res.status(404).json({ error: 'there is no employee by this id' });
            } else {
                res.send('Successfully! Employee updated - ' + employee.name);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// delete a employee by id
app.delete('/api/employees/:employee_id', function(req, res) {
	console.log(req.params.employee_id);
	let id = req.params.employee_id;
	// Employee.remove({
	// 	_id : id
	// }, function(err) {
	// 	if (err)
	// 		res.send(err);
	// 	else
	// 		res.send('Successfully! Employee has been Deleted.');	
	// });
    Employee.deleteOne({ _id: id })
        .then(result => {
            if (result.deletedCount === 0) {
                res.status(404).json({ error: 'there is no employee by this id' });
            } else {
                res.send('Successfully! Employee has been Deleted.');
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

//code and routes for mongodb atlas database Asn4
app.get('/api/sale', function (req, res) {
    Sale.find()
        .then(sale => {
            console.log(sale.Type);
            res.json(sale);
        })
        .catch(err => {
            res.send(err);
        });
});
//get invoice base on id
app.get('/api/sale/:invoice_id', function(req, res) {
    console.log(req.body);

	let id = req.params.invoice_id;
	
    Sale.findById(id)
        .then(sale => {
            if (!sale) {
                res.status(404).json({ error: 'there is no sales by this id' });
            } else {
                res.send('Successfully! here is the invoice for the id- '+sale);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
//create a new invoice
app.post('/api/sale', function(req, res) {

    // create mongose method to create a new record into collection

	
    Sale.create({
        "Invoice ID": req.body.invoiceid,
        Branch: req.body.branch,
        City: req.body.city,
        "Customer type": req.body.custtype,
        "Product line": req.body.proline,
        name: req.body.name,
        image: req.body.image,
        "Unit price":req.body.price,
        Quantity: req.body.quantity,
        "Tax 5%": req.body.tax,
        Total: req.body.total,
        Date: req.body.date,
        Time: req.body.time,
        Payment: req.body.payment,
        cogs: req.body.cogs,
        "gross income": req.body.grossincome,
        Rating: req.body.rating
    })
    .then(sale => {
        Sale.find()
            .then(sales => {
                res.json(sales);
            })
            .catch(err => {
                res.send(err);
            });
    })
    .catch(err => {
        res.send(err);
    });

 
});
// delete an invoice by id
app.delete('/api/sale/:id', function(req, res) {
	console.log(req.params.id);
	let id = req.params.id;
	
    Sale.deleteOne({ _id: id })
        .then(result => {
            if (result.deletedCount === 0) {
                res.status(404).json({ error: 'there is no invoice by this id' });
            } else {
                res.send('Successfully! invoice has been Deleted.');
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

// create employee and send back all employees after creation
app.put('/api/sale/:id', function(req, res) {
	// create mongose method to update an existing record into collection

	let id = req.params.id;
	var data = {
		"Invoice Id": req.body.invoiceid,
        ranch: req.body.branch,
        city: req.body.city,
        "customer type": req.body.custtype,
        "product line": req.body.proline,
        name: req.body.name,
        image: req.body.image,
        "unit price":req.body.price,
        quantity: req.body.quantity,
        tax: req.body.tax,
        total: req.body.total,
        date: req.body.date,
        time: req.body.time,
        payment: req.body.payment,
        cogs: req.body.cogs,
        "gross income": req.body.grossincome,
        rating: req.body.rating
	}
    Sale.findByIdAndUpdate(id, data, { new: true })
        .then(sales => {
            if (!sales) {
                res.status(404).json({ error: 'there is no invoice by this id' });
            } else {
                res.send('Successfully! invoice updated with invoice id - ' + sales["Invoice Id"]);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
//handlebar invoice info
app.get('/viewData', function(req, res) {
    Sale.find()
    .then(sale => {
        res.render('partials/sales', { sale });
    })
    .catch(err => {
        res.send(err);
    });
});
//new functionality
app.get('/api/saleInvoice/:invoice_id', function(req, res) {

	let id = req.params.invoice_id;
	console.log(id);
    
    // Sale.find()
    // .then(sale => {
    //     console.log(sale[0]["Invoice ID"]);
    //     for(i=0;i<sale.length;i++){
    //         if(sale[i]["Invoice ID"]==id)
    //         {
    //             console.log(sale[i]);
    //             res.json(sale[i]);
    //         }
    //     }
    // })
    // .catch(err => {
    //     res.send(err);
    // });
    Sale.findOne({ "Invoice ID": id })
        .then(sale => {
            if (!sale) {
                res.status(404).json({ error: 'Invoice not found' });
            } else {
                res.json(sale);
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'Internal Server Error' });
        });


});
//insert invoice
app.get('/insert/Invoice', (req, res) => {
    res.render('page/insertinvoice');
  });
app.post('/insert/Invoice', function(req, res) {

    // create mongose method to create a new record into collection
    console.log(req.body);

	
    Sale.create({
        "Invoice ID": req.body.invoiceid,
        Branch: req.body.branch,
        City: req.body.city,
        "Customer type": req.body.custtype,
        "Product line": req.body.proline,
        name: req.body.name,
        image: req.body.image,
        "Unit price":req.body.price,
        Quantity: req.body.quantity,
        "Tax 5%": req.body.tax,
        Total: req.body.total,
        Date: req.body.date,
        Time: req.body.time,
        Payment: req.body.payment,
        cogs: req.body.cogs,
        "gross income": req.body.grossincome,
        Rating: req.body.rating
    })
    .then(sale => {
        Sale.find()
            .then(sales => {
                res.json(sales);
            })
            .catch(err => {
                res.send(err);
            });
    })
    .catch(err => {
        res.send(err);
    });

 
});

app.listen(port);
console.log("App listening on port : " + port);