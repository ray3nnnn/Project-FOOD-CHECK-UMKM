const express = require("express");

const router = express.Router();


const {
    pool
} = require("../database");


const {
    verifyToken,
    verifyOwner
} = require("../middleware/auth");




// ===============================
// DASHBOARD OWNER
// ===============================

router.get(
"/dashboard",
verifyToken,
verifyOwner,
async(req,res)=>{


try{


const result =
await pool.query(

`
SELECT

users.nama,

pemeriksaan.id,

pemeriksaan.nama_makanan,

pemeriksaan.kategori,

pemeriksaan.kemasan,

pemeriksaan.warna,

pemeriksaan.aroma,

pemeriksaan.tekstur,

pemeriksaan.tanggal_produksi,

pemeriksaan.tanggal_kadaluarsa,

pemeriksaan.hasil,

pemeriksaan.catatan,

pemeriksaan.created_at


FROM pemeriksaan


JOIN users

ON pemeriksaan.user_id = users.id


ORDER BY pemeriksaan.created_at DESC

`

);



res.json({

success:true,

data:result.rows

});



}

catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Server error"

});


}


}

);



module.exports = router;const express = require("express");

const router = express.Router();


const {
    pool
} = require("../database");


const {
    verifyToken,
    verifyOwner
} = require("../middleware/auth");




// ===============================
// DASHBOARD OWNER
// ===============================

router.get(
"/dashboard",
verifyToken,
verifyOwner,
async(req,res)=>{


try{


const result =
await pool.query(

`
SELECT

users.nama,

pemeriksaan.id,

pemeriksaan.nama_makanan,

pemeriksaan.kategori,

pemeriksaan.kemasan,

pemeriksaan.warna,

pemeriksaan.aroma,

pemeriksaan.tekstur,

pemeriksaan.tanggal_produksi,

pemeriksaan.tanggal_kadaluarsa,

pemeriksaan.hasil,

pemeriksaan.catatan,

pemeriksaan.created_at


FROM pemeriksaan


JOIN users

ON pemeriksaan.user_id = users.id


ORDER BY pemeriksaan.created_at DESC

`

);



res.json({

success:true,

data:result.rows

});



}

catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Server error"

});


}


}

);



module.exports = router;