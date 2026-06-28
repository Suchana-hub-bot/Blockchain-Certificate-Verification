"use strict";

/* ---------- Admin Protection ---------- */

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

/* ---------- Load Institutes ---------- */

let institutes=Storage.getInstitutes();

const tbody=document.querySelector("#instituteTable tbody");

/* ---------- Show Empty ---------- */

if(institutes.length===0){

tbody.innerHTML=

"<tr><td colspan='6'>No Institutes Found.</td></tr>";

}

/* ---------- Display ---------- */

function loadTable(){

tbody.innerHTML="";

institutes=Storage.getInstitutes();

if(institutes.length===0){

tbody.innerHTML=

"<tr><td colspan='6'>No Institutes Found.</td></tr>";

return;

}

institutes.forEach(function(item,index){

let row=document.createElement("tr");

row.innerHTML=`

<td>${item.id}</td>

<td>${item.name}</td>

<td>${item.email}</td>

<td>${item.status}</td>

<td>${item.certificatesIssued}</td>

<td>

${
item.status==="Pending"

?

`<button onclick="approveInstitute(${index})">

Approve

</button>`

:

"Approved"

}

<br><br>

<button onclick="deleteInstitute(${index})">

Delete

</button>

</td>

`;

tbody.appendChild(row);

});

}

loadTable();

/* ---------- Approve ---------- */

function approveInstitute(index){

institutes[index].status="Approved";

Storage.saveInstitutes(institutes);

loadTable();

}

/* ---------- Delete ---------- */

function deleteInstitute(index){

if(confirm("Delete this institute?")){

institutes.splice(index,1);

Storage.saveInstitutes(institutes);

loadTable();

}

}

/* ---------- Global ---------- */

window.approveInstitute=approveInstitute;

window.deleteInstitute=deleteInstitute;