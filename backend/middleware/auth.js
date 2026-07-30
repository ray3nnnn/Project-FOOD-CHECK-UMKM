const jwt = require("jsonwebtoken");


function verifyToken(req,res,next){


const header =
req.headers.authorization;


if(!header){

return res.status(401).json({

success:false,

message:"Token tidak ada"

});

}



const token =
header.split(" ")[1];



try{


const decoded =
jwt.verify(
token,
process.env.JWT_SECRET
);


req.user = decoded;


next();


}

catch(error){

console.log(error);

res.status(500).json({

success:false,

message:error.message

});

}


}



function verifyOwner(req,res,next){


if(req.user.role !== "owner"){


return res.status(403).json({

success:false,

message:"Akses khusus owner"

});


}


next();


}



module.exports={
verifyToken,
verifyOwner
};