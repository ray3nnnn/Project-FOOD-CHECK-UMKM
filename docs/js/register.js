async function register(){


const nama =
document.getElementById("nama").value.trim();


const username =
document.getElementById("username").value.trim();


const password =
document.getElementById("password").value;




if(!nama || !username || !password){

alert(
"Semua data wajib diisi"
);

return;

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


alert(
"Registrasi berhasil"
);



location.href =
"index.html";



}
else{


alert(
data.message
);



}



}

catch(error){


console.log(error);


alert(
"Server tidak terhubung"
);


}



}
