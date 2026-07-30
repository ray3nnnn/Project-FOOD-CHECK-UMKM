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

async function createOwner(){


try{


// cek apakah owner sudah ada

const cekOwner = await pool.query(

`
SELECT *
FROM users
WHERE username=$1
`,

[
"owner"
]

);



if(cekOwner.rows.length > 0){

console.log(
"Owner sudah ada"
);

process.exit();

}





const hash = await bcrypt.hash(
"owner123",
10
);





await pool.query(

`
INSERT INTO users
(
    nama,
    username,
    password,
    role
)

VALUES
(
    $1,
    $2,
    $3,
    $4
)

`,

[

"Administrator",

"owner",

hash,

"owner"

]

);





console.log(
"✅ Owner berhasil dibuat"
);



process.exit();



}
catch(error){


console.log(
"❌ Error:",
error.message
);


process.exit(1);


}


}



createOwner();  