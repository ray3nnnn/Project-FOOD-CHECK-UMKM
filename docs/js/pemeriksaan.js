const token =
localStorage.getItem("token");


const user =
JSON.parse(localStorage.getItem("user"));


// cegah double submit
let sedangSimpan = false;



if(!token || !user){

location.href="index.html";

}



const sidebarNama =
document.getElementById("sidebarNama");


const sidebarRole =
document.getElementById("sidebarRole");


if(sidebarNama){

sidebarNama.innerHTML =
user.nama;

}


if(sidebarRole){

sidebarRole.innerHTML =
user.role;

}




async function simpanPemeriksaanBaru(){


if(sedangSimpan){

return;

}



const namaMakanan =
document.getElementById("nama_makanan")
.value
.trim();


const kategori =
document.getElementById("kategori")
.value
.trim();


const kemasan =
document.getElementById("kemasan")
.value
.trim();


const warna =
document.getElementById("warna")
.value
.trim();


const aroma =
document.getElementById("aroma")
.value
.trim();


const tekstur =
document.getElementById("tekstur")
.value
.trim();


const tanggalProduksi =
document.getElementById("tanggal_produksi")
.value;


const tanggalKadaluarsa =
document.getElementById("tanggal_kadaluarsa")
.value;


const hasil =
document.getElementById("hasil")
.value;


const catatan =
document.getElementById("catatan")
.value
.trim();





if(!namaMakanan){

alert("Nama makanan wajib diisi");

return;

}


if(!kategori){

alert("Kategori wajib diisi");

return;

}


if(!catatan){

alert("Catatan wajib diisi");

return;

}





sedangSimpan=true;




const data = {


nama_makanan:
namaMakanan,


kategori:
kategori,


kemasan:
kemasan,


warna:
warna,


aroma:
aroma,


tekstur:
tekstur,


tanggal_produksi:
tanggalProduksi,


tanggal_kadaluarsa:
tanggalKadaluarsa,


hasil:
hasil,


catatan:
catatan


};




console.log(
"DATA KIRIM",
data
);




try{


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


}


);





const result =
await response.json();




console.log(
"HASIL SERVER",
result
);





if(result.success){


alert(
"Pemeriksaan berhasil disimpan"
);



location.href =
"riwayat.html";



}
else{


alert(
result.message
);


sedangSimpan=false;


}



}

catch(error){


console.log(error);


alert(
"Gagal menyimpan pemeriksaan"
);


sedangSimpan=false;


}



}
