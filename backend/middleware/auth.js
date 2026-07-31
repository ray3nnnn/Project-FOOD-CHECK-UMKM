const jwt = require("jsonwebtoken");


// ==========================
// VERIFY TOKEN
// ==========================

function verifyToken(req,res,next){


const authHeader =
req.headers.authorization;



// cek header

if(!authHeader){


return res.status(401).json({

success:false,

message:"Token tidak ditemukan"

});


}



// cek format Bearer

const parts =
authHeader.split(" ");



if(
parts.length !== 2 ||
parts[0] !== "Bearer"
){


return res.status(401).json({

success:false,

message:"Format token tidak valid"

});


}



const token =
parts[1];



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


console.log(
"JWT ERROR:",
error.message
);



return res.status(401).json({

success:false,

message:"Token tidak valid atau sudah expired"

});


}



}





// ==========================
// OWNER ONLY
// ==========================


function verifyOwner(req,res,next){



if(!req.user){


return res.status(401).json({

success:false,

message:"User tidak terautentikasi"

});


}




if(
req.user.role !== "owner"
){


return res.status(403).json({

success:false,

message:"Akses hanya untuk owner"

});


}




next();



}





module.exports = {

verifyToken,

verifyOwner

};