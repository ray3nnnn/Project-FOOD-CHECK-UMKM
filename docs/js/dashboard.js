// =================
// CONFIG
// =================

const token =
localStorage.getItem("token");


const user =
JSON.parse(
localStorage.getItem("user")
);



if(!token || !user){

location.href="index.html";

}



// simpan semua data owner

let ownerData = [];

let ownerChart = null;



// =================
// SIDEBAR
// =================


const sidebarNama =
document.getElementById(
"sidebarNama"
);


const sidebarRole =
document.getElementById(
"sidebarRole"
);



if(sidebarNama){

sidebarNama.innerHTML =
user.nama;

}


if(sidebarRole){

sidebarRole.innerHTML =
user.role;

}

// AVATAR DINAMIS

const avatar =
document.getElementById("avatar");


if(avatar){

avatar.innerHTML =
user.nama
.charAt(0)
.toUpperCase();

}



// =================
// ELEMENT
// =================


const roleTitle =
document.getElementById(
"roleTitle"
);



const welcome =
document.getElementById(
"welcome"
);



const btnIsi =
document.getElementById(
"btnIsi"
);



const manageBox =
document.getElementById(
"manageBox"
);



const menuPemeriksaan =
document.getElementById(
"btnMenuPemeriksaan"
);



const filterOwnerBox =
document.getElementById(
"filterOwnerBox"
);



const filterMember =
document.getElementById(
"filterMember"
);


const modal =
document.getElementById("detailModal");


const detailIsi =
document.getElementById("detailIsi");


// =================
// ROLE CONTROL
// =================


if(user.role==="owner"){


if(roleTitle){

roleTitle.innerHTML =
"Dashboard Owner";

}



if(welcome){

welcome.innerHTML =
"Administrator";

}



if(btnIsi){

btnIsi.style.display =
"none";

}



if(menuPemeriksaan){

menuPemeriksaan.style.display =
"none";

}



if(manageBox){

manageBox.style.display =
"block";

}



if(filterOwnerBox){

filterOwnerBox.style.display =
"block";

}



loadOwner();



}
else{


if(roleTitle){

roleTitle.innerHTML =
"Dashboard Member";

}



if(welcome){

welcome.innerHTML =
user.nama;

}



if(menuPemeriksaan){

menuPemeriksaan.style.display =
"block";

}



if(btnIsi){

btnIsi.style.display =
"block";

}



if(manageBox){

manageBox.style.display =
"none";

}



loadMember();



}




// =================
// OWNER LOAD
// =================


async function loadOwner(){


try{


const response =
await fetch(

API+"/owner/dashboard",

{

headers:{

Authorization:
"Bearer "+token

}

}

);



const result =
await response.json();



console.log(
"OWNER DATA",
result.data
);



ownerData =
result.data || [];



// sorting terbaru

ownerData.sort(
(a,b)=>
new Date(b.created_at)
-
new Date(a.created_at)
);



isiFilterMember(
ownerData
);



hitung(
ownerData
);



tampilkanTerbaru(
ownerData
);



tampilkanPerhatian(
ownerData
);



}

catch(error){

console.log(error);

}


}

// =================
// FILTER MEMBER
// =================


let filterSudahDipasang = false;



function isiFilterMember(data){


if(!filterMember){

return;

}



let members = [];



data.forEach(item=>{


if(
item.nama &&
!members.includes(item.nama)
){

members.push(item.nama);

}


});




let html = `

<option value="all">
Semua Member
</option>

`;



members.forEach(nama=>{


html += `

<option value="${nama}">
${nama}
</option>

`;



});



filterMember.innerHTML =
html;





// cegah event listener dobel

if(!filterSudahDipasang){


filterMember.addEventListener(
"change",
function(){


let hasil;



if(this.value==="all"){


hasil =
ownerData;


}

else{


hasil =

ownerData.filter(

item =>

item.nama === this.value

);


}





hitung(
hasil
);



tampilkanTerbaru(
hasil
);



tampilkanPerhatian(
hasil
);



}

);



filterSudahDipasang=true;


}



}





// =================
// MEMBER LOAD
// =================



async function loadMember(){


try{


const response =
await fetch(

API+"/pemeriksaan",

{

headers:{

Authorization:
"Bearer "+token

}

}

);



const result =
await response.json();



console.log(
"MEMBER DATA",
result
);



hitung(

result.data || []

);



}

catch(error){

console.log(error);

}



}





// =================
// STATISTIK
// =================



function hitung(data){



const total =
document.getElementById(
"total"
);



const layak =
document.getElementById(
"layak"
);



const tidakLayak =
document.getElementById(
"tidakLayak"
);





const jumlahLayak =

data.filter(

item=>

item.hasil==="LAYAK"

).length;





const jumlahTidakLayak =

data.filter(

item=>

item.hasil==="TIDAK LAYAK"

).length;






if(total){

total.innerHTML =
data.length;

}



if(layak){

layak.innerHTML =
jumlahLayak;

}



if(tidakLayak){

tidakLayak.innerHTML =
jumlahTidakLayak;

}



buatChart(data);



}




// =================
// PEMERIKSAAN TERBARU OWNER FINAL
// =================

function tampilkanTerbaru(data){


const box =
document.getElementById(
"latestData"
);



if(!box){

return;

}



let html = "";



if(data.length === 0){


html = `

<div class="detail-card">

<h3>
📋 Belum Ada Pemeriksaan
</h3>

<p>
Belum ada data pemeriksaan makanan.
</p>

</div>

`;



}
else{


data
.slice(0,4)
.forEach(item=>{


const statusClass =

item.hasil === "LAYAK"

?

"layak"

:

"tidak";



const statusText =

item.hasil === "LAYAK"

?

"🟢 LAYAK"

:

"🔴 TIDAK LAYAK";





html += `


<div class="detail-card">



<h3>
🍜 ${item.nama_makanan || "-"}
</h3>



<div class="detail-row">

<span>
Pemilik
</span>


<b>
${item.nama || "-"}
</b>


</div>





<div class="detail-row">

<span>
Kategori
</span>


<b>
${item.kategori || "-"}
</b>


</div>





<div class="detail-row">

<span>
Kemasan
</span>


<b>
${item.kemasan || "-"}
</b>


</div>





<div class="detail-row">

<span>
Status
</span>


<b class="status ${statusClass}">

${statusText}

</b>


</div>





<div class="detail-row">

<span>
Catatan
</span>


<b>
${item.catatan || "-"}
</b>


</div>





<div class="detail-row">

<span>
Tanggal Pemeriksaan
</span>


<b>
${formatTanggal(item.created_at)}
</b>


</div>




<button

class="btnDetail"

onclick="lihatDetail(${item.id})"

>

🔎 Lihat Detail

</button>



</div>



`;


});


}



box.innerHTML =
html;


}





// =================
// MONITORING KEAMANAN PANGAN FINAL
// =================


function tampilkanPerhatian(data){


const box =
document.getElementById(
"warningData"
);



if(!box){

return;

}





const masalah =

data.filter(

item =>

item.hasil === "TIDAK LAYAK"

);





let html="";





if(masalah.length===0){


html = `

<div class="detail-card">

<h3>
✅ Kondisi Aman
</h3>


<p>
Semua pemeriksaan makanan dalam kondisi baik.
</p>


</div>

`;


}
else{



html += `


<div class="detail-card">


<h3>
⚠️ ${masalah.length} Makanan Membutuhkan Perhatian
</h3>


<p>
Berikut makanan dengan hasil pemeriksaan tidak layak.
</p>


</div>


`;





masalah
.slice(0,5)
.forEach(item=>{



html += `


<div class="detail-card">


<h3>
🔴 ${item.nama_makanan || "-"}
</h3>




<div class="detail-row">

<span>
Pemilik
</span>


<b>
${item.nama || "-"}
</b>


</div>




<div class="detail-row">

<span>
Kategori
</span>


<b>
${item.kategori || "-"}
</b>


</div>





<div class="detail-row">

<span>
Masalah
</span>


<b>
${item.catatan || "-"}
</b>


</div>




<div class="detail-row">

<span>
Tanggal Pemeriksaan
</span>


<b>
${formatTanggal(item.created_at)}
</b>


</div>




</div>


`;



});



}




box.innerHTML =
html;



}








// =================
// CHART STATISTIK OWNER
// =================


function buatChart(data){



const canvas =
document.getElementById(
"ownerChart"
);



if(!canvas){

return;

}





const jumlahLayak =

data.filter(

item =>

item.hasil==="LAYAK"

).length;





const jumlahTidakLayak =

data.filter(

item =>

item.hasil==="TIDAK LAYAK"

).length;





if(ownerChart){

ownerChart.destroy();

}





ownerChart =

new Chart(

canvas,

{


type:"doughnut",



data:{


labels:[

"LAYAK",

"TIDAK LAYAK"

],



datasets:[{

data:[

jumlahLayak,

jumlahTidakLayak

]


}]


},




options:{


responsive:true,



plugins:{


legend:{


position:"bottom"


}



}



}



}

);



}





// =================
// FORMAT TANGGAL
// =================


function formatTanggal(tanggal){


if(!tanggal){

return "-";

}



return new Date(tanggal)

.toLocaleDateString(

"id-ID"

);



}

// =================
// DETAIL PEMERIKSAAN OWNER
// =================


function lihatDetail(id){


const item =

ownerData.find(

data =>

data.id == id

);





if(!item){


alert(
"Data pemeriksaan tidak ditemukan"
);


return;

}





const modal =

document.getElementById(
"detailModal"
);





const isi =

document.getElementById(
"detailIsi"
);





if(modal){

modal.style.display =
"flex";

}





if(isi){



isi.innerHTML = `


<h2>
🍜 ${item.nama_makanan || "-"}
</h2>



<div class="detail-row">

<span>
Pemilik
</span>


<b>
${item.nama || "-"}
</b>


</div>




<div class="detail-row">

<span>
Kategori
</span>


<b>
${item.kategori || "-"}
</b>


</div>





<div class="detail-row">

<span>
Kemasan
</span>


<b>
${item.kemasan || "-"}
</b>


</div>





<div class="detail-row">

<span>
Warna
</span>


<b>
${item.warna || "-"}
</b>


</div>





<div class="detail-row">

<span>
Aroma
</span>


<b>
${item.aroma || "-"}
</b>


</div>





<div class="detail-row">

<span>
Tekstur
</span>


<b>
${item.tekstur || "-"}
</b>


</div>





<div class="detail-row">

<span>
Hasil Pemeriksaan
</span>


<b class="status ${item.hasil==="LAYAK"?"layak":"tidak"}">

${item.hasil==="LAYAK" ? "🟢 LAYAK" : "🔴 TIDAK LAYAK"}

</b>


</div>





<div class="detail-row">

<span>
Tanggal Produksi
</span>


<b>
${formatTanggal(item.tanggal_produksi)}
</b>


</div>





<div class="detail-row">

<span>
Tanggal Kadaluarsa
</span>


<b>
${formatTanggal(item.tanggal_kadaluarsa)}
</b>


</div>





<div class="detail-row">

<span>
Catatan
</span>


<b>
${item.catatan || "-"}
</b>


</div>





<div class="detail-row">

<span>
Tanggal Pemeriksaan
</span>


<b>
${formatTanggal(item.created_at)}
</b>


</div>



`;



}


}







// =================
// TUTUP DETAIL
// =================


function tutupDetail(){

const modal =
document.getElementById(
"detailModal"
);


if(modal){

modal.style.display="none";

}

}



// =================
// LOGOUT
// =================


function logout(){


localStorage.clear();


location.href =
"index.html";


}





// =================
// REALTIME OWNER
// =================


if(user.role==="owner"){



setInterval(()=>{

loadOwner();

},30000);



}