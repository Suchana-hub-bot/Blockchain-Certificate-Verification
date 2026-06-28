"use strict";

/* ===========================
   Authentication
=========================== */

const institute = Storage.getLoggedInstitute();

if (!institute) {

    window.location.href = "institute-login.html";

}

/* ===========================
   Load Latest Institute Data
=========================== */

const institutes = Storage.getInstitutes();

const currentInstitute = institutes.find(function(item){

    return item.id === institute.id;

});

if(!currentInstitute){

    Storage.logoutInstitute();

    window.location.href="institute-login.html";

}

/* ===========================
   Display Details
=========================== */

document.getElementById("welcomeName").textContent =
currentInstitute.name;

document.getElementById("instituteId").textContent =
currentInstitute.id;

document.getElementById("instituteName").textContent =
currentInstitute.name;

document.getElementById("instituteEmail").textContent =
currentInstitute.email;

document.getElementById("instituteStatus").textContent =
currentInstitute.status;

document.getElementById("certificateCount").textContent =
currentInstitute.certificatesIssued;

/* ===========================
   Refresh Login Session
=========================== */

Storage.setLoggedInstitute(currentInstitute);

/* ===========================
   Logout
=========================== */

document
.getElementById("logoutBtn")
.addEventListener("click",function(e){

e.preventDefault();

Storage.logoutInstitute();

window.location.href="institute-login.html";

});