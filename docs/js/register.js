async function register(){


const nama =
document.getElementById("nama")
.value.trim();


const username =
document.getElementById("username")
.value.trim();


const password =
document.getElementById("password")
.value;



if(!nama || !username || !password){


showToast(

"⚠️ Semua data wajib diisi",

"warning"

);


return;

}





const button =
document.querySelector(
".register-card button"
);



if(button){

button.disabled=true;

button.innerHTML=
"⏳ Membuat akun...";

}





try{


const response =
await fetch(

API+"/auth/register",

{


method:"POST",


headers:{


"Content-Type":"application/json"

},


body:JSON.stringify({

nama,

username,

password

})


}

);





const data =
await response.json();






if(data.success){



showToast(

"✅ Registrasi berhasil",

"success"

);





setTimeout(()=>{


location.href="index.html";


},1200);



}

else{


showToast(

"❌ "+data.message,

"error"

);



button.disabled=false;

button.innerHTML=
"📝 Daftar";


}





}

catch(error){



console.log(error);



showToast(

"❌ Server tidak terhubung",

"error"

);



button.disabled=false;

button.innerHTML=
"📝 Daftar";

}



}