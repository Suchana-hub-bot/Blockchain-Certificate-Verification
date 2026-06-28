"use strict";

if(localStorage.getItem("adminLoggedIn")!=="true"){

window.location.href="admin-login.html";

}

const institutes=Storage.getInstitutes();

const certificates=Storage.getCertificates();

document.getElementById("totalInstitutes").textContent=

institutes.length;

const approved=

institutes.filter(function(item){

return item.status==="Approved";

});

document.getElementById("approvedInstitutes").textContent=

approved.length;

document.getElementById("totalCertificates").textContent=

certificates.length;

document
.getElementById("logoutBtn")
.addEventListener("click",function(e){

e.preventDefault();

localStorage.removeItem("adminLoggedIn");

window.location.href="admin-login.html";

});