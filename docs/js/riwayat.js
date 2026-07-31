// =================================================
// RIWAYAT.JS FINAL CLEAN
// FOOD CHECK UMKM
// =================================================


// =======================
// AUTH
// =======================

const token =
localStorage.getItem("token");


const user =
JSON.parse(
localStorage.getItem("user")
);



if(!token || !user){

location.href="index.html";

}



// =======================
// SIDEBAR
// =======================


const sidebarNama =
document.getElementById("sidebarNama");


const sidebarRole =
document.getElementById("sidebarRole");


const avatar =
document.getElementById("avatar");



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



// =======================
// ROLE MENU
// =======================


const btnMenuPemeriksaan =
document.getElementById(
"btnMenuPemeriksaan"
);



if(
user.role==="owner" &&
btnMenuPemeriksaan
){

btnMenuPemeriksaan.style.display="none";

}



// =======================
// ELEMENT
// =======================


const dataBox =
document.getElementById("data");


const ownerFilter =
document.getElementById(
"ownerFilter"
);


const filterMember =
document.getElementById(
"filterMember"
);


const filterHasil =
document.getElementById(
"filterHasil"
);


const searchMakanan =
document.getElementById(
"searchMakanan"
);




// =======================
// DATA GLOBAL
// =======================


let semuaData=[];




// =======================
// LOAD
// =======================


loadRiwayat();





async function loadRiwayat(){


try{


let endpoint;



// OWNER

if(user.role==="owner"){


endpoint =
API+"/owner/dashboard";


if(ownerFilter){

ownerFilter.style.display="flex";

}


}


// MEMBER

else{


endpoint =
API+"/pemeriksaan";


if(ownerFilter){

ownerFilter.style.display="none";

}


}




const response =
await fetch(
endpoint,
{


headers:{


Authorization:
"Bearer "+token


}


}

);





if(response.status===401){

logout();

return;

}




const result =
await response.json();




semuaData =
result.data || [];




semuaData.sort(
(a,b)=>
new Date(b.created_at)
-
new Date(a.created_at)
);





if(user.role==="owner"){

buatFilterOwner();

}




renderRiwayat(
semuaData
);



}

catch(error){


console.error(
"RIWAYAT ERROR",
error
);


showToast(
"Gagal mengambil data"
);


}



}





// =======================
// FILTER OWNER
// =======================


function buatFilterOwner(){


if(!filterMember){

return;

}



let daftarMember=[];




semuaData.forEach(item=>{


if(
item.nama &&
!daftarMember.includes(item.nama)
){

daftarMember.push(
item.nama
);

}


});




let html=`

<option value="all">
Semua Member
</option>

`;




daftarMember.forEach(nama=>{


html+=`

<option value="${nama}">
${nama}
</option>

`;


});




filterMember.innerHTML=
html;




filterMember.onchange=
jalankanFilter;



if(filterHasil){

filterHasil.onchange=
jalankanFilter;

}



if(searchMakanan){

searchMakanan.onkeyup=
jalankanFilter;

}



}




// =======================
// FILTER SYSTEM
// =======================


function jalankanFilter(){


let hasil =
[...semuaData];




// MEMBER

if(
filterMember &&
filterMember.value!=="all"
){


hasil =
hasil.filter(
item=>
item.nama===filterMember.value
);


}




// STATUS

if(
filterHasil &&
filterHasil.value!=="all"
){


hasil =
hasil.filter(
item=>
item.hasil===filterHasil.value
);


}




// SEARCH


if(
searchMakanan &&
searchMakanan.value.trim()
){


const keyword =
searchMakanan.value
.toLowerCase();



hasil =
hasil.filter(
item=>

(item.nama_makanan||"")
.toLowerCase()
.includes(keyword)

);


}




renderRiwayat(
hasil
);



}





// =======================
// RENDER CARD
// =======================


function renderRiwayat(data){


if(!dataBox){

return;

}



window.dataRiwayat =
data;




let html="";





if(data.length===0){


html=`

<div class="empty-data">


<h3>
📭 Belum Ada Pemeriksaan
</h3>


<p>
Belum terdapat data pemeriksaan makanan.
</p>


</div>

`;


}

else{



data.forEach(
(item,index)=>{


const layak =
item.hasil==="LAYAK";



html+=`

<div class="detail-card riwayat-card">


<h3>
🍜 ${item.nama_makanan || "-"}
</h3>



<div class="detail-row">

<span>
👤 Pemilik
</span>

<b>
${item.nama || user.nama}
</b>

</div>



<div class="detail-row">

<span>
📂 Kategori
</span>

<b>
${item.kategori || "-"}
</b>

</div>



<div class="detail-row">

<span>
📦 Kemasan
</span>

<b>
${item.kemasan || "-"}
</b>

</div>




<div class="detail-row">

<span>
🛡 Status
</span>


<b class="status ${
layak
?"layak"
:"tidak"
}">


${layak?"🟢":"🔴"}

${item.hasil || "-"}


</b>


</div>




<div class="detail-row">

<span>
📅 Pemeriksaan
</span>

<b>
${formatTanggal(item.created_at)}
</b>

</div>




<button

class="btnDetail"

onclick="lihatDetail(${index})"

>

🔎 Lihat Detail

</button>


</div>


`;



});


}




dataBox.innerHTML=
html;



}





// =======================
// FORMAT TANGGAL
// =======================


function formatTanggal(tanggal){


if(!tanggal){

return "-";

}



return new Date(tanggal)
.toLocaleDateString(
"id-ID",
{

day:"2-digit",

month:"long",

year:"numeric"

}

);



}





// =======================
// LOGOUT
// =======================


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