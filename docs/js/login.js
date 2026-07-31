/* ==================================================
   LOGIN.JS FINAL CLEAN
   FOOD CHECK UMKM
================================================== */


async function login(){


const username =
document
.getElementById("username")
.value
.trim();



const password =
document
.getElementById("password")
.value
.trim();




if(!username){


showToast(
"Username wajib diisi",
"warning"
);


return;


}





if(!password){


showToast(
"Password wajib diisi",
"warning"
);


return;


}





const loginForm =
document.getElementById("loginForm");



/*
==================================
AMBIL TOMBOL LOGIN SAJA
BUKAN BUTTON EYE
==================================
*/


const button =
loginForm.querySelector(
'button[type="submit"]'
);





if(button){


button.disabled=true;


button.innerHTML=
"⏳ Memproses...";


}








try{





const response =

await fetch(

API + "/auth/login",

{


method:"POST",


headers:{


"Content-Type":
"application/json"


},


body:

JSON.stringify({

username,
password

})


}

);









/*
==================================
SAFE JSON RESPONSE
==================================
*/


const text =
await response.text();



let result;




try{


result =
JSON.parse(text);



}

catch(error){



console.log(
"SERVER RESPONSE:",
text
);



throw new Error(
"Response bukan JSON"
);



}






if(!response.ok || !result.success){



showToast(

result.message ||

"Login gagal",

"error"

);



resetButton();



return;


}









localStorage.setItem(

"token",

result.token

);









localStorage.setItem(

"user",

JSON.stringify(
result.user
)

);









showToast(

"Login berhasil 👋",

"success"

);









setTimeout(()=>{


location.href=
"dashboard.html";


},800);









}


catch(error){


console.log(
"LOGIN ERROR",
error
);

showToast(

"Server tidak dapat dihubungi",

"error"

);





resetButton();




}



}













function resetButton(){



const loginForm =
document.getElementById("loginForm");



const button =
loginForm.querySelector(
'button[type="submit"]'
);





if(button){



button.disabled=false;



button.innerHTML=
"🔐 Masuk";



}



}