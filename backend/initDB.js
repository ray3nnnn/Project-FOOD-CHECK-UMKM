require("dotenv").config();

const { pool } = require("./database");


async function initDB(){

try{


await pool.query(`

CREATE TABLE IF NOT EXISTS users(

id SERIAL PRIMARY KEY,

nama VARCHAR(100),

username VARCHAR(100) UNIQUE,

password TEXT,

role VARCHAR(20)

);



CREATE TABLE IF NOT EXISTS pemeriksaan(

id SERIAL PRIMARY KEY,

user_id INTEGER REFERENCES users(id),

nama_makanan VARCHAR(100),

kategori VARCHAR(100),

kemasan VARCHAR(100),

warna VARCHAR(100),

aroma VARCHAR(100),

tekstur VARCHAR(100),

tanggal_produksi DATE,

tanggal_kadaluarsa DATE,

hasil VARCHAR(100),

catatan TEXT,

created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

`);



console.log("✅ Database berhasil dibuat");


process.exit();


}

catch(error){

console.log(error.message);

process.exit(1);

}


}


initDB();