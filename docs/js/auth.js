const token = localStorage.getItem("token");

const user = JSON.parse(
localStorage.getItem("user")
);


function cekLogin(){


if(!token || !user){


location.href="index.html";


return false;


}


return true;


}




function logout(){


localStorage.removeItem("token");

localStorage.removeItem("user");


location.href="index.html";


}