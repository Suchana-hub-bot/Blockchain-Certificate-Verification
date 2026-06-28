"use strict";

/* ===========================
   Authentication
=========================== */

const institute = Storage.getLoggedInstitute();

if (!institute) {

    window.location.href = "institute-login.html";

}

/* ===========================
   Logout
=========================== */

document
.getElementById("logoutBtn")
.addEventListener("click", function (e) {

    e.preventDefault();

    Storage.logoutInstitute();

    window.location.href = "institute-login.html";

});

/* ===========================
   Load Certificates
=========================== */

const certificates = Storage.getCertificates();

const tbody =
document.querySelector("#certificateTable tbody");

const myCertificates =
certificates.filter(function (item) {

    return item.instituteId === institute.id;

});

if (myCertificates.length === 0) {

    tbody.innerHTML =

    "<tr><td colspan='6'>No Certificates Issued Yet.</td></tr>";

}
else {

    myCertificates.forEach(function (certificate) {

        const row = document.createElement("tr");

        row.innerHTML = `

        <td>${certificate.certificateId}</td>

        <td>${certificate.studentName}</td>

        <td>${certificate.course}</td>

        <td>${certificate.passingYear}</td>

        <td>${certificate.blockNumber}</td>

        <td>${certificate.hash.substring(0,15)}...</td>

        `;

        tbody.appendChild(row);

    });

}