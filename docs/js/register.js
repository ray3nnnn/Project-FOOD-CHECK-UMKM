async function register(){


let nama =
document.getElementById("nama").value;


let username =
document.getElementById("username").value;


let password =
document.getElementById("password").value;



try{


let response =
await fetch(
API + "/auth/register",
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


});



let data =
await response.json();



if(data.success){


alert(
"Registrasi berhasil"
);


window.location.href =
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