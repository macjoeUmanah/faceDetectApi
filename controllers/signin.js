const login=(req,res,postgre,bcrypt)=>{

     //res.send("signing in");
     const {email,password}=req.body;

     if(!email || !password){


          return res.status(400).json("Wrong login");
     }

     postgre.select('*').from('login').where('email','=',req.body.email).then(data=>{


              
     	//console.log(data[0]);
     	const isValid=bcrypt.compareSync(req.body.password,data[0].hash);

     	//console.log(isValid);
     	if(isValid){
     		postgre.select('*').from('users').where('email','=',data[0].email).then(user=>{

     			res.json(user[0]);


     		}).catch(err=>{

     			res.status(400).json("cannot get user");
     		});
     	}else{

     		res.status(400).json("invalid password");
     	}
     }).catch(err=>{

     	res.status(400).json("wrong credentials");
     })

     

}


module.exports={

     loginHandler:login
}