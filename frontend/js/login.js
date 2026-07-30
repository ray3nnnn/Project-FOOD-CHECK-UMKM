let sedangLogin = false;



async function login(){



if(sedangLogin){

return;

}


sedangLogin = true;



let username =
document.getElementById("username").value.trim();


let password =
document.getElementById("password").value;



if(username===""){

alert("Username wajib diisi");

sedangLogin=false;

return;

}



if(password===""){

alert("Password wajib diisi");

sedangLogin=false;

return;

}





try{



let response =
await fetch(

API+"/auth/login",

{


method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

username,

password

})


}

);




let data =
await response.json();





console.log(data);





if(data.success){



localStorage.setItem(

"token",

data.token

);




localStorage.setItem(

"user",

JSON.stringify(data.user)

);





alert("Login berhasil");




window.location.href =
"dashboard.html";





}else{



alert(data.message);



}



}

catch(error){



console.log(error);



alert(
"Server tidak terhubung"
);



}



sedangLogin=false;



}







// ======================
// ENTER LOGIN
// ======================


document.addEventListener(
"DOMContentLoaded",
()=>{


const form =
document.getElementById("loginForm");


if(form){


form.addEventListener(
"submit",
function(e){


e.preventDefault();


login();


}

);


}


});