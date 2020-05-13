const express=require('express');
const Joi=require('joi');
const app=express();
app.use(express.json());


const customers=[
	{title:'Aditya',id:1},
	{title:'Praneet',id:2},
	{title:'Maheshwari',id:3},
	{title:'Amy',id:4},
	{title:'Gstar',id:5}
]

//read request handlers
//display the msg when the URL consist of '/'
app.get('/',(req,res)=>{
	res.send("server is responding");
});

app.get('/api/customer',(req,res)=>{
	res.send(customers);
});

app.get('/api/customer/:id',(req,res)=>{
	const customer=customers.find(c=>c.id===parseInt(req.params.id));
	if(!customer) res.status(404).send("cannot send...id not found");
	res.send(customer);		
});


//create request handlers
//create new customer information
app.post('/api/customers',(req,res)=>{

	const {error} = validateCustomer(req.body);
	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}

	//increment customer id
	const customer={
		id: customers.length+1,
		title:req.body.title
	}

});

//update customer details
app.put('api/customers/:id',(req,res)=>{
	const customer = customers.find(c=>c.id===parseInt(req.params.id));
	if(!customer){
		 res.status(404).send("cannot find the id");
		 return;
	}

	const {error} = validateCustomer(req.body);
	if(error){
		res.status(400).send(error.details[0].message);
		return;
	}	

	customer.title = req.body.title;
	res.send(customer);
});


//delete customer details
app.delete('api/customers/:id',(req,res)=>{
	const customer = customers.find(c=>c.id===parseInt(req.params.id));
	if(!customer) res.send(404).send("cannot find the id");

	const index = customers.indexOf(customer);
	customers.splice(index,1);

	res.send(customer);	
});

//validate info
function validateCustomer(customer){
	const schema={
		title:Joi.string().min(3).required()
	};
	return Joi.validate(customer,schema);
}

//port environment variable
const port = 3000;
app.listen(port,()=>console.log('listening to port: '+port));