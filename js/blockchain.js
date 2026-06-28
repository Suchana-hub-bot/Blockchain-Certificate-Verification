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
   Load Blockchain
=========================== */

const blockchain = Storage.getBlockchain();

const tbody =
document.querySelector("#ledgerTable tbody");

/* ===========================
   Empty Ledger
=========================== */

if (blockchain.length === 0) {

    tbody.innerHTML =
    "<tr><td colspan='5'>No Blockchain Records Found.</td></tr>";

}

/* ===========================
   Display Blocks
=========================== */

else {

    blockchain.forEach(function (block) {

        const row = document.createElement("tr");

        row.innerHTML = `

        <td>${block.blockNumber}</td>

        <td>${block.certificateId}</td>

        <td>${block.previousHash.substring(0,15)}...</td>

        <td>${block.currentHash.substring(0,15)}...</td>

        <td>${block.timestamp}</td>

        `;

        tbody.appendChild(row);

    });

}