const Clarifai=require('clarifai');

const app = new Clarifai.App({
       apiKey: '44a2923fa0e1492a835b6b8c12928430'
      });

const apiHandler=(req,res)=>{app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input).then(data=>{

	res.json(data);



}).catch(err=>{

	res.status(400).json("There is some kind of error");
});


}


const increaseEntries=(req,res,postgre)=>{


	const {id}=req.body;

	postgre('users').where('id','=',id).increment('entries',1)
	.returning('entries')
	.then(response=>{

          if(response.length){
          	res.json(response[0]);
          }else{

          	res.status(400).json("this didnt work");
          }

	}).catch(err=>console.log(err))
	
}


module.exports={

	increase:increaseEntries,
	apiHandler:apiHandler
}