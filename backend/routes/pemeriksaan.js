const express = require("express");

const router = express.Router();


const {
    pool
} = require("../database");


const {
    verifyToken
} = require("../middleware/auth");




// =================================
// GET RIWAYAT MEMBER SENDIRI
// =================================

router.get(
"/",
verifyToken,
async(req,res)=>{


try{


const result = await pool.query(

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


WHERE pemeriksaan.user_id = $1


ORDER BY pemeriksaan.id DESC

`,

[
req.user.id
]

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

message:"Gagal mengambil data"

});


}


}

);







// =================================
// POST SIMPAN PEMERIKSAAN
// =================================


router.post(
"/",
verifyToken,
async(req,res)=>{


try{


if(req.user.role==="owner"){


return res.status(403).json({

success:false,

message:
"Owner tidak dapat membuat pemeriksaan"

});


}




const {

nama_makanan,
kategori,
kemasan,
warna,
aroma,
tekstur,
tanggal_produksi,
tanggal_kadaluarsa,
hasil,
catatan

}=req.body;





await pool.query(

`
INSERT INTO pemeriksaan

(
user_id,
nama_makanan,
kategori,
kemasan,
warna,
aroma,
tekstur,
tanggal_produksi,
tanggal_kadaluarsa,
hasil,
catatan
)


VALUES

(
$1,
$2,
$3,
$4,
$5,
$6,
$7,
$8,
$9,
$10,
$11
)

`,

[

req.user.id,

nama_makanan,

kategori,

kemasan,

warna,

aroma,

tekstur,

tanggal_produksi,

tanggal_kadaluarsa,

hasil,

catatan

]

);



res.json({

success:true,

message:
"Pemeriksaan berhasil disimpan"

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