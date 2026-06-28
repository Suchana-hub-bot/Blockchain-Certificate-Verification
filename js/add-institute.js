"use strict";

/* ---------- Check Admin Login ---------- */

if(localStorage.getItem("adminLoggedIn")!=="true"){

window.location.href="admin-login.html";

}

/* ---------- Logout ---------- */

document
.getElementById("logoutBtn")
.addEventListener("click",function(e){

e.preventDefault();

localStorage.removeItem("adminLoggedIn");

window.location.href="admin-login.html";

});

/* ---------- Form ---------- */

const form=document.getElementById("instituteForm");

const message=document.getElementById("message");

form.addEventListener("submit",function(e){

e.preventDefault();

const name=document.getElementById("name").value.trim();

const email=document.getElementById("email").value.trim();

const phone=document.getElementById("phone").value.trim();

const address=document.getElementById("address").value.trim();

const username=document.getElementById("username").value.trim();

const password=document.getElementById("password").value.trim();

/* ---------- Phone Validation ---------- */

if(!/^[0-9]{10}$/.test(phone)){

message.className="error";

message.innerHTML="❌ Enter a valid 10 digit phone number.";

return;

}

let institutes=Storage.getInstitutes();

/* ---------- Duplicate Email ---------- */

if(institutes.some(function(item){

return item.email.toLowerCase()===email.toLowerCase();

})){

message.className="error";

message.innerHTML="❌ Email already exists.";

return;

}

/* ---------- Duplicate Username ---------- */

if(institutes.some(function(item){

return item.username.toLowerCase()===username.toLowerCase();

})){

message.className="error";

message.innerHTML="❌ Username already exists.";

return;

}

/* ---------- Generate Institute ID ---------- */

const instituteId=

"INS"+String(1001+institutes.length);

/* ---------- Create Object ---------- */

const institute={

id:instituteId,

name:name,

email:email,

phone:phone,

address:address,

username:username,

password:password,

status:"Pending",

certificatesIssued:0

};

/* ---------- Save ---------- */

institutes.push(institute);

Storage.saveInstitutes(institutes);

/* ---------- Success ---------- */

message.className="success";

message.innerHTML=

`
<b>✓ Institute Added Successfully</b>

<br><br>

Institute ID : <b>${instituteId}</b>

<br>

Status : <b>Pending Approval</b>
`;

form.reset();

});