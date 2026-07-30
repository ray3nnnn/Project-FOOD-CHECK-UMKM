const { Pool } = require("pg");


const pool = new Pool({

    host: process.env.PGHOST,

    user: process.env.PGUSER,

    password: process.env.PGPASSWORD,

    database: process.env.PGDATABASE,

    port: process.env.PGPORT,

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