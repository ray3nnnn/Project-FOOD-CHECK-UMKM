function verifyOwner(req,res,next){


    if(req.user.role !== "owner"){


        return res.status(403).json({

            success:false,

            message:
            "Akses khusus owner"

        });


    }


    next();


}

console.log(
"verifyToken:",
typeof verifyToken
);

console.log(
"verifyOwner:",
typeof verifyOwner
);

module.exports = verifyOwner;