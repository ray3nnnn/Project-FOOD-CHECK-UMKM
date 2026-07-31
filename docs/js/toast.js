/* ==================================================
   TOAST.JS FINAL CLEAN
   FOOD CHECK UMKM
================================================== */



function showToast(
message,
type="success"
){



let toast =
document.getElementById(
"toast"
);





if(!toast){


toast =
document.createElement(
"div"
);


toast.id="toast";


document.body.appendChild(
toast
);


}







toast.className="";



toast.classList.add(type);



toast.innerHTML =
message;







setTimeout(()=>{


toast.classList.add(
"show"
);



},50);








setTimeout(()=>{


toast.classList.remove(
"show"
);



},3000);





}