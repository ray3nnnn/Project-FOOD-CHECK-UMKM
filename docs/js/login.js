let sedangLogin = false;


async function login(){


if(sedangLogin){
    return;
}


sedangLogin = true;


const username =
document.getElementById("username").value.trim();


const password =
document.getElementById("password").value;



try{


const response = await fetch(
API + "/auth/login",
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



const data = await response.json();



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



}
else{


alert(data.message);


}



}
catch(error){


console.log(error);


alert(
"Server tidak terhubung"
);


}


sedangLogin = false;


}




document.addEventListener(
"DOMContentLoaded",
()=>{


const form =
document.getElementById("loginForm");



if(form){


form.addEventListener(
"submit",
(e)=>{


e.preventDefault();


login();


}

);


}


});