/* ==================================================
   DASHBOARD.JS FINAL CLEAN
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

    throw new Error("Unauthorized");

}





/* =====================
   SIDEBAR
===================== */


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

// =====================
// HIDE MENU OWNER
// =====================

const menuPemeriksaan =
document.getElementById("btnMenuPemeriksaan");


if(menuPemeriksaan && user.role==="owner"){

    menuPemeriksaan.style.display="none";

}




/* =====================
   ELEMENT
===================== */


const welcome =
document.getElementById("welcome");


const roleTitle =
document.getElementById("roleTitle");


const total =
document.getElementById("total");


const layak =
document.getElementById("layak");


const tidakLayak =
document.getElementById("tidakLayak");


const latestData =
document.getElementById("latestData");


const warningData =
document.getElementById("warningData");


const btnIsi =
document.getElementById("btnIsi");


const btnRefresh =
document.getElementById("btnRefresh");

const ownerGrid =
document.getElementById("ownerGrid");


const chartBox =
document.getElementById("chartBox");


const warningBox =
document.getElementById("warningBox");

let chartInstance=null;



let semuaData=[];




/* =====================
   START
===================== */


loadDashboard();







async function loadDashboard(){


try{


if(user.role==="owner"){


    await loadOwner();


}
else{


    await loadMember();


}



}
catch(error){


console.log(
"DASHBOARD ERROR",
error
);


}



}








/* =====================
   MEMBER DASHBOARD
===================== */


async function loadMember(){



if(roleTitle){

roleTitle.innerHTML =
"Dashboard Member";

}



if(welcome){

welcome.innerHTML =
user.nama;

}



if(btnIsi){

btnIsi.style.display="block";

}

if(btnRefresh){

btnRefresh.style.display="none";

}

// =====================
// MEMBER UI FIX
// =====================


if(ownerGrid){

ownerGrid.style.display="block";

}



if(chartBox){

chartBox.style.display="none";

}



if(warningBox){

warningBox.style.display="none";

}



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





if(response.status===401){

logout();

return;

}




const result =
await response.json();





const data =
result.data || [];






hitungStatistik(data);






if(latestData){


latestData.innerHTML =

buatCardTerbaru(
data
.slice(0,3)
);


}




}




/* =====================
   OWNER DASHBOARD
===================== */


async function loadOwner(){



if(roleTitle){

roleTitle.innerHTML =
"Dashboard Owner";

}



if(welcome){

welcome.innerHTML =
user.nama;

}





if(btnIsi){

btnIsi.style.display="none";

}






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





if(response.status===401){

logout();

return;

}





const result =
await response.json();





semuaData =
result.data || [];





hitungStatistik(
semuaData
);





buatChart(
semuaData
);





tampilkanTerbaru(
semuaData
);





tampilkanWarning(
semuaData
);



}








/* =====================
   STATISTIK
===================== */


function hitungStatistik(data){



const totalData =
data.length;



const jumlahLayak =

data.filter(

item=>

item.hasil==="LAYAK"

).length;





const jumlahTidak =

data.filter(

item=>

item.hasil==="TIDAK LAYAK"

).length;





if(total){

total.innerHTML =
totalData;

}



if(layak){

layak.innerHTML =
jumlahLayak;

}



if(tidakLayak){

tidakLayak.innerHTML =
jumlahTidak;

}



}









/* =====================
   CHART
===================== */


function buatChart(data){



const canvas =
document.getElementById(
"ownerChart"
);



if(!canvas){

return;

}





const ctx =
canvas.getContext("2d");





const jumlahLayak =

data.filter(

item=>

item.hasil==="LAYAK"

).length;





const jumlahTidak =

data.filter(

item=>

item.hasil==="TIDAK LAYAK"

).length;







if(chartInstance){

chartInstance.destroy();

}







chartInstance =
new Chart(

ctx,

{


type:"doughnut",


data:{


labels:[

"Layak",

"Tidak Layak"

],



datasets:[{

data:[

jumlahLayak,

jumlahTidak

]

}]


},


options:{


responsive:true,


maintainAspectRatio:true,


plugins:{


legend:{


position:"top"


}


}



}


}

);



}









/* =====================
   TERBARU
===================== */


function tampilkanTerbaru(data){



if(!latestData){

return;

}



const terbaru =

[...data]

.sort(

(a,b)=>

new Date(b.created_at)

-

new Date(a.created_at)

)

.slice(0,5);





latestData.innerHTML =

buatCardTerbaru(
terbaru
);



}





function buatCardTerbaru(data){



if(data.length===0){


return `

<p>

Belum ada pemeriksaan.

</p>

`;


}




let html="";




data.forEach(item=>{



html += `

<div class="detail-card">


<h3>

🍜 ${item.nama_makanan || "-"}

</h3>



<p>

👤 ${item.nama || "-"}

</p>


<p>

🛡 ${item.hasil || "-"}

</p>



</div>


`;



});



return html;



}









/* =====================
   WARNING
===================== */


function tampilkanWarning(data){



if(!warningData){

return;

}



const warning =

data.filter(

item=>

item.hasil==="TIDAK LAYAK"

);





if(warning.length===0){


warningData.innerHTML=

`

<p>

✅ Semua makanan dalam kondisi aman.

</p>

`;

return;


}





let html="";





warning.forEach(item=>{



html+=`

<div class="detail-card">


<h3>

⚠️ ${item.nama_makanan || "-"}

</h3>



<p>

Pemilik:
${item.nama || "-"}

</p>


</div>

`;



});





warningData.innerHTML =
html;



}








/* =====================
   LOGOUT
===================== */


function logout(){



localStorage.removeItem("token");

localStorage.removeItem("user");


location.href="index.html";


}