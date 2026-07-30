require("dotenv").config();

const bcrypt = require("bcryptjs");

const {
    pool
}=require("./database");



async function createOwner(){


try{


const hash =
await bcrypt.hash(
    "owner123",
    10
);



await pool.query(

`
INSERT INTO users
(
    nama,
    username,
    password,
    role
)

VALUES

($1,$2,$3,'owner')

`,

[

"Administrator",

"owner",

hash

]

);



console.log(
"Owner berhasil dibuat"
);



process.exit();


}
catch(error){


console.log(error.message);

process.exit(1);


}


}



createOwner();