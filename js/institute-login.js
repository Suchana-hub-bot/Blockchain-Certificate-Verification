"use strict";

/* ===========================
   Elements
=========================== */

const form = document.getElementById("loginForm");

const message = document.getElementById("message");

/* ===========================
   Login
=========================== */

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document
        .getElementById("username")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value
        .trim();

    const institutes = Storage.getInstitutes();

    const institute = institutes.find(function (item) {

        return (
            item.username === username &&
            item.password === password
        );

    });

    if (!institute) {

        message.className = "error";

        message.textContent = "❌ Invalid Username or Password.";

        return;

    }

    if (institute.status !== "Approved") {

        message.className = "error";

        message.textContent =
            "❌ Your institute is waiting for admin approval.";

        return;

    }

    Storage.setLoggedInstitute(institute);

    window.location.href = "institute-dashboard.html";

});