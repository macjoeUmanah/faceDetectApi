const register=(req,res,postgre,bcrypt)=>{

	const {name,email,password}=req.body;

	if(!name || !email || !password){


		return res.status(400).json("incorrect form subm");
	}

	const hash=bcrypt.hashSync(password);


	// let pass=bcrypt.hash(password,null,null,function(err,hash){

	// 	console.log(hash);



	// });

	postgre.transaction(trx=>{


		trx.insert({

			hash:hash,
			email:email
		}).
		into('login').returning('email').then(loginEmail=>{
	return trx('users').returning('*').insert({

				name:name,
				email:loginEmail[0],
				joined:new Date()
	}).then(data=>{

		res.json(data[0])

	}).catch(err=>{
		res.status(400).json("unable to register");
	})




		}).then(trx.commit)
	.catch(trx.rollback);
		




	}).then(err=>console.log(err))
	.catch(err=>console.log(err));


	// database.users.push({

	// 	id:"126",
	// 	name:name,
	// 	email:email,
	// 	password:password,
	// 	entries:"0",
	// 	joined:new Date(),




	// });


	//res.json("success");




}

module.exports={


	registerHandler:register
}