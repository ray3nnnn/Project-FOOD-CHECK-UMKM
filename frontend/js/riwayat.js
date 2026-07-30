const token =
localStorage.getItem("token");


const user =
JSON.parse(localStorage.getItem("user"));



if(!token || !user){

location.href="index.html";

}


// =================
// SIDEBAR
// =================


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




// =================
// MENU
// =================


const menuPemeriksaan =
document.getElementById(
"btnMenuPemeriksaan"
);



if(user.role==="owner"){


if(menuPemeriksaan){

menuPemeriksaan.style.display="none";

}

}




// =================
// ELEMENT
// =================


const dataBox =
document.getElementById("data");


const ownerFilter =
document.getElementById("ownerFilter");


const filterMember =
document.getElementById("filterMember");


const filterHasil =
document.getElementById("filterHasil");


const searchMakanan =
document.getElementById("searchMakanan");



let semuaData=[];



// =================
// LOAD
// =================


loadRiwayat();





async function loadRiwayat(){


try{


let url;



if(user.role==="owner"){


url =
API + "/owner/dashboard";


if(ownerFilter){

ownerFilter.style.display="flex";

}


}
else{


url =
API + "/pemeriksaan";


}




const response =
await fetch(

url,

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
"RIWAYAT",
result
);



semuaData =
result.data || [];



semuaData.sort(

(a,b)=>

new Date(b.created_at)
-
new Date(a.created_at)

);




if(user.role==="owner"){

buatFilterMember();

}



tampilkan(
semuaData
);



}
catch(error){

console.log(error);

}



}






// =================
// FILTER OWNER
// =================


function buatFilterMember(){


if(!filterMember){

return;

}



let member=[];



semuaData.forEach(item=>{


if(

item.nama &&

!member.includes(item.nama)

){

member.push(item.nama);

}


});




let html=`

<option value="all">

Semua Member

</option>

`;




member.forEach(nama=>{


html+=`

<option value="${nama}">

${nama}

</option>

`;



});



filterMember.innerHTML =
html;



filterMember.onchange =
jalankanFilter;


if(filterHasil){

filterHasil.onchange =
jalankanFilter;

}



if(searchMakanan){

searchMakanan.onkeyup =
jalankanFilter;

}



}







function jalankanFilter(){


let hasil =
semuaData;



if(
filterMember &&
filterMember.value!=="all"

){


hasil =
hasil.filter(

item=>

item.nama === filterMember.value

);


}




if(

filterHasil &&

filterHasil.value!=="all"

){


hasil =
hasil.filter(

item=>

item.hasil === filterHasil.value

);


}




if(

searchMakanan &&

searchMakanan.value.trim() !== ""

){


hasil =
hasil.filter(

item =>

item.nama_makanan

.toLowerCase()

.includes(

searchMakanan.value.toLowerCase()

)

);


}




tampilkan(hasil);



}








// =================
// CARD COMPACT
// =================



function tampilkan(data){


if(!dataBox){

return;

}



window.dataRiwayat =
data;



let html="";



if(data.length===0){


html=`

<p>

Tidak ada data pemeriksaan.

</p>

`;



}
else{


data.forEach((item,index)=>{



let statusClass =

item.hasil==="LAYAK"

?

"layak"

:

"tidak";




html+=`

<div class="detail-card compact">


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
Status
</span>


<b class="status ${statusClass}">

${item.hasil || "-"}

</b>


</div>




<div class="detail-row">

<span>
Tanggal
</span>


<b>
${formatTanggal(item.created_at)}
</b>


</div>





<button

class="btnDetail"

onclick="lihatDetail(${index})"

>

🔎 Detail

</button>



</div>


`;



});



}



dataBox.innerHTML =
html;



}








// =================
// MODAL DETAIL
// =================



function lihatDetail(index){

const item =
window.dataRiwayat[index];



if(!item){

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

modal.style.display="flex";

}




if(isi){


isi.innerHTML=`

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

${item.hasil==="LAYAK" 
? "🟢 LAYAK" 
: "🔴 TIDAK LAYAK"}

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
// LOGOUT
// =================


function logout(){


localStorage.clear();


location.href="index.html";


}