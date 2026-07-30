async function register(){



let nama =
document.getElementById("nama").value;


let username =
document.getElementById("username").value;


let password =
document.getElementById("password").value;



let response =
await fetch(
"http://localhost:5000/api/auth/register",
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


window.location.href=
"index.html";


}

else{


alert(data.message);


}



}