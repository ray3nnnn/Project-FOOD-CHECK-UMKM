/* ==================================================
   PEMERIKSAAN.JS FINAL CLEAN
   FOOD CHECK UMKM
================================================== */


/* =====================
   AUTH
===================== */


const token =
localStorage.getItem("token");


const user =
JSON.parse(
localStorage.getItem("user")
);



if(!token || !user){


location.href="index.html";


}






/* =====================
   SIDEBAR
===================== */


const sidebarNama =
document.getElementById(
"sidebarNama"
);


const sidebarRole =
document.getElementById(
"sidebarRole"
);


const avatar =
document.getElementById(
"avatar"
);





if(sidebarNama){


sidebarNama.innerHTML =
user.nama || "-";


}





if(sidebarRole){


sidebarRole.innerHTML =
user.role || "-";


}





if(avatar){


avatar.innerHTML =

(user.nama || "U")

.charAt(0)

.toUpperCase();


}








/* =====================
   SUBMIT LOCK
===================== */


let sedangSimpan=false;








/* =====================
   SIMPAN PEMERIKSAAN
===================== */


async function simpanPemeriksaanBaru(){





if(sedangSimpan){


return;


}





/* =====================
   AMBIL INPUT
===================== */


const data = {


nama_makanan:

getValue(
"nama_makanan"
),



kategori:

getValue(
"kategori"
),



kemasan:

getValue(
"kemasan"
),



warna:

getValue(
"warna"
),



aroma:

getValue(
"aroma"
),



tekstur:

getValue(
"tekstur"
),



tanggal_produksi:

getValue(
"tanggal_produksi"
),



tanggal_kadaluarsa:

getValue(
"tanggal_kadaluarsa"
),



hasil:

getValue(
"hasil"
),



catatan:

getValue(
"catatan"
)



};










/* =====================
   VALIDASI
===================== */



if(!data.nama_makanan){


showToast(

"Nama makanan wajib diisi",

"warning"

);


return;


}




if(!data.kategori){


showToast(

"Kategori wajib diisi",

"warning"

);


return;


}







if(!data.catatan){


showToast(

"Catatan pemeriksaan wajib diisi",

"warning"

);


return;


}








if(

data.tanggal_produksi &&

data.tanggal_kadaluarsa

){



const produksi =
new Date(
data.tanggal_produksi
);



const kadaluarsa =
new Date(
data.tanggal_kadaluarsa
);





if(kadaluarsa < produksi){



showToast(

"Tanggal kadaluarsa tidak boleh sebelum produksi",

"warning"

);



return;


}



}












/* =====================
   KIRIM DATA
===================== */


sedangSimpan=true;





const tombol =
document.querySelector(
".btnSimpan"
);




if(tombol){


tombol.disabled=true;


tombol.innerHTML=
"⏳ Menyimpan...";


}








try{



const response =

await fetch(

API+"/pemeriksaan",

{


method:"POST",



headers:{


"Content-Type":

"application/json",



Authorization:

"Bearer "+token


},



body:

JSON.stringify(data)



}

);








if(response.status===401){



logout();


return;


}








const result =
await response.json();







console.log(
"HASIL SERVER",
result
);









if(result.success){



showToast(

"Pemeriksaan berhasil disimpan",

"success"

);





setTimeout(()=>{


location.href=
"riwayat.html";


},800);




}
else{



showToast(

result.message ||

"Gagal menyimpan data",

"error"

);



aktifkanTombol();


}








}
catch(error){



console.log(

"PEMERIKSAAN ERROR",

error

);




showToast(

"Gagal terhubung ke server",

"error"

);



aktifkanTombol();



}




}









/* =====================
   HELPER
===================== */


function getValue(id){



const el =
document.getElementById(id);




if(!el){

return "";

}



return el.value.trim();



}








function aktifkanTombol(){



sedangSimpan=false;



const tombol =
document.querySelector(
".btnSimpan"
);





if(tombol){


tombol.disabled=false;


tombol.innerHTML=

"💾 Simpan Pemeriksaan";


}



}








/* =====================
   LOGOUT FALLBACK
===================== */


function logout(){



localStorage.removeItem(
"token"
);


localStorage.removeItem(
"user"
);



location.href=
"index.html";


}