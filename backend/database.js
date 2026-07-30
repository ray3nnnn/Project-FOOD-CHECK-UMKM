const { Pool } = require("pg");


const pool = new Pool({

    connectionString: process.env.DATABASE_URL,

    ssl:{
        rejectUnauthorized:false
    }

});


async function testConnection(){

try{

await pool.query("SELECT 1");

console.log("✅ PostgreSQL Connected");


}
catch(error){

console.log(
"Database Error:",
error.message
);

}

}


module.exports={
pool,
testConnection
};


async function testConnection(){

try{

await pool.query("SELECT 1");

console.log("✅ PostgreSQL Connected");


}
catch(error){

console.log(
"Database Error:",
error.message
);

}


}


module.exports={
pool,
testConnection
};