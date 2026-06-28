"use strict";

/* ===========================
   Elements
=========================== */

const form = document.getElementById("verifyForm");

const resultCard = document.getElementById("resultCard");

/* ===========================
   Verify Certificate
=========================== */

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const certificateId = document
        .getElementById("certificateId")
        .value
        .trim();

    const certificates = Storage.getCertificates();

    const certificate = certificates.find(function (item) {

        return item.certificateId.toUpperCase() === certificateId.toUpperCase();

    });

    if (!certificate) {

        resultCard.style.display = "block";

        document.getElementById("certificate").textContent = "-";
        document.getElementById("student").textContent = "-";
        document.getElementById("institute").textContent = "-";
        document.getElementById("course").textContent = "-";
        document.getElementById("year").textContent = "-";
        document.getElementById("cgpa").textContent = "-";
        document.getElementById("issueDate").textContent = "-";
        document.getElementById("block").textContent = "-";
        document.getElementById("hash").textContent = "-";

        const status = document.getElementById("status");

        status.innerHTML = "❌ Certificate Not Found";

        status.style.color = "red";

        return;

    }

    document.getElementById("certificate").textContent =
        certificate.certificateId;

    document.getElementById("student").textContent =
        certificate.studentName;

    document.getElementById("institute").textContent =
        certificate.instituteName;

    document.getElementById("course").textContent =
        certificate.course;

    document.getElementById("year").textContent =
        certificate.passingYear;

    document.getElementById("cgpa").textContent =
        certificate.cgpa;

    document.getElementById("issueDate").textContent =
        certificate.issueDate;

    document.getElementById("block").textContent =
        certificate.blockNumber;

    document.getElementById("hash").textContent =
        certificate.hash;

    const status = document.getElementById("status");

    status.innerHTML = "✅ VERIFIED";

    status.style.color = "green";

    resultCard.style.display = "block";

});