require("dotenv").config();

const bcrypt = require("bcryptjs");

const {
    pool
} = require("./database");



async function createOwner(){


try{


// cek owner sudah ada

const cek = await pool.query(

`
SELECT *
FROM users
WHERE username=$1
`,

[
"owner"
]

);



if(cek.rows.length > 0){

console.log(
"Owner sudah tersedia"
);

process.exit();

}




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

($1,$2,$3,$4)

`,

[

"Administrator",

"owner",

hash,

"owner"

]

);



console.log(
"✅ Owner berhasil dibuat"
);



process.exit();



}

catch(error){


console.log(
"❌ Error:",
error.message
);


process.exit(1);


}


}



createOwner();