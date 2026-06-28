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

document.getElementById("logoutBtn").addEventListener("click", function (e) {

    e.preventDefault();

    Storage.logoutInstitute();

    window.location.href = "institute-login.html";

});

/* ===========================
   SHA-256 Function
=========================== */

async function generateHash(data) {

    const text = new TextEncoder().encode(data);

    const hashBuffer = await crypto.subtle.digest("SHA-256", text);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray.map(function (b) {

        return b.toString(16).padStart(2, "0");

    }).join("");

}

/* ===========================
   Form
=========================== */

const form = document.getElementById("certificateForm");

const message = document.getElementById("message");

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const studentName = document.getElementById("studentName").value.trim();

    const rollNumber = document.getElementById("rollNumber").value.trim();

    const course = document.getElementById("course").value.trim();

    const passingYear = document.getElementById("passingYear").value.trim();

    const cgpa = document.getElementById("cgpa").value.trim();

    let certificates = Storage.getCertificates();

    let blockchain = Storage.getBlockchain();

    /* Duplicate Roll Number */

    const duplicate = certificates.find(function (item) {

        return item.rollNumber === rollNumber;

    });

    if (duplicate) {

        message.className = "error";

        message.textContent = "❌ Certificate already issued for this Roll Number.";

        return;

    }

    /* Certificate ID */

    const certificateId =
        "CERT-" +
        new Date().getFullYear() +
        "-" +
        String(certificates.length + 1).padStart(4, "0");

    /* Issue Date */

    const issueDate = new Date().toLocaleDateString();

    /* Verification Code */

    const verificationCode =
        "VC-" + Math.floor(100000 + Math.random() * 900000);

    /* Hash Data */

    const hashInput =
        certificateId +
        studentName +
        rollNumber +
        course +
        passingYear +
        cgpa +
        issueDate +
        institute.name;

    const hash = await generateHash(hashInput);

    /* Blockchain */

    const previousHash =
        blockchain.length === 0
            ? "0000000000000000"
            : blockchain[blockchain.length - 1].currentHash;

    const blockNumber = blockchain.length + 1;

    const block = {

        blockNumber: blockNumber,

        certificateId: certificateId,

        previousHash: previousHash,

        currentHash: hash,

        timestamp: new Date().toLocaleString()

    };

    blockchain.push(block);

    Storage.saveBlockchain(blockchain);

    /* Certificate */

    const certificate = {

        certificateId: certificateId,

        verificationCode: verificationCode,

        studentName: studentName,

        rollNumber: rollNumber,

        course: course,

        passingYear: passingYear,

        cgpa: cgpa,

        issueDate: issueDate,

        instituteId: institute.id,

        instituteName: institute.name,

        hash: hash,

        blockNumber: blockNumber

    };

    certificates.push(certificate);

    Storage.saveCertificates(certificates);

    /* Update Institute Count */

    let institutes = Storage.getInstitutes();

    const index = institutes.findIndex(function (item) {

        return item.id === institute.id;

    });

    if (index !== -1) {

        institutes[index].certificatesIssued++;

        Storage.saveInstitutes(institutes);

        Storage.setLoggedInstitute(institutes[index]);

    }

    /* Success */

    message.className = "success";

    message.innerHTML = `
        <b>✅ Certificate Issued Successfully</b>
        <br><br>
        <b>Certificate ID:</b> ${certificateId}
        <br>
        <b>Verification Code:</b> ${verificationCode}
        <br>
        <b>Blockchain Block:</b> ${blockNumber}
        <br>
        <b>SHA-256:</b> ${hash.substring(0,20)}...
    `;

    form.reset();

});