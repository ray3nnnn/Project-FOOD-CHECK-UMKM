
const token =
localStorage.getItem("token");


const user =
JSON.parse(localStorage.getItem("user"));


// PENGAMAN AGAR TIDAK DOUBLE SUBMIT
let sedangSimpan = false;


if(!token || !user){

location.href="index.html";

}


document.getElementById("sidebarNama").innerHTML =
user.nama;


document.getElementById("sidebarRole").innerHTML =
user.role;


async function simpanPemeriksaanBaru(){


if(sedangSimpan){

return;

}


// VALIDASI FORM

const namaMakanan =
document.getElementById("nama_makanan").value.trim();


const kategori =
document.getElementById("kategori").value.trim();


const catatan =
document.getElementById("catatan").value.trim();



if(!namaMakanan){

alert(
"Nama makanan wajib diisi!"
);

return;

}



if(!kategori){

alert(
"Kategori makanan wajib diisi!"
);

return;

}



if(!catatan){

alert(
"Catatan pemeriksaan wajib diisi!"
);

return;

}



sedangSimpan=true;


try{


const data = {


nama_makanan:
namaMakanan,


nama_makanan:
namaMakanan,


kemasan:
document.getElementById("kemasan").value,


warna:
document.getElementById("warna").value,


aroma:
document.getElementById("aroma").value,


tekstur:
document.getElementById("tekstur").value,


tanggal_produksi:
document.getElementById("tanggal_produksi").value,


tanggal_kadaluarsa:
document.getElementById("tanggal_kadaluarsa").value,


hasil:
document.getElementById("hasil").value,


catatan:
catatan


};



console.log("DATA KIRIM:",data);



const response =
await fetch(
API+"/pemeriksaan",
{


method:"POST",


headers:{


"Content-Type":"application/json",


Authorization:
"Bearer "+token


},


body:
JSON.stringify(data)


});


const result =
await response.json();



console.log(
"HASIL SERVER:",
result
);



if(result.success){


alert(
"Pemeriksaan berhasil disimpan"
);


setTimeout(()=>{

location.href="riwayat.html";

},500);


}
else{

sedangSimpan=false;

alert(result.message);

}



}
catch(error){

console.log(error);

sedangSimpan=false;

alert(
"Gagal menyimpan pemeriksaan"
);

}



}