const express=require('express');

const bodyPer=require('body-parser');

const cors=require('cors');

const knex=require('knex');


const bcrypt=require('bcrypt-nodejs');

const app=express();

app.use(cors());
app.use(bodyPer.json());
const register=require('./controllers/register');
const login=require('./controllers/signin');
const increaseEntries=require('./controllers/image');
const postgre=knex({

client:'pg',
connection:{

	connectionString:process.env.DATABASE_URL,
	ssl:true,
}

});

//const all=postgre.select('*').from('users').then(response=>console.log(response)).catch(err=>console.log(err));






app.get('/',(req,res)=>{

   res.send("this shot is working");



});


app.put('/image',(req,res)=>{increaseEntries.increase(req,res,postgre)});

let userFound=false;


app.get('/profile/:id',(req,res)=>{

	const {id}=req.params;

	postgre.select('*').from('users').where({

		id:id
	}).then(response=>{


		if(response.length){

			res.json(response[0]);
		}else{

			res.status(400).json("not found");
		}


	}).catch(err=>res.status(400).json("error getting users"));

});




app.post('/signin',(req,res)=>{login.loginHandler(req,res,postgre,bcrypt)});

app.post('/register',(req,res)=>{register.registerHandler(req,res,postgre,bcrypt)});
app.post('/imageApi',(req,res)=>{increaseEntries.apiHandler(req,res)})


app.listen(process.env.PORT,()=>{


	console.log(`app is running on port 3000 ${process.env.PORT}`);




});