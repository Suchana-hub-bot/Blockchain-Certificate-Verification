"use strict";

/* ===========================
   Admin Login
=========================== */

const form = document.getElementById("adminLoginForm");

const message = document.getElementById("message");

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

    /* Demo Credentials */

    if (username === "admin" && password === "admin123") {

        localStorage.setItem("adminLoggedIn", "true");

        window.location.href = "admin-dashboard.html";

    }

    else {

        message.textContent = "❌ Invalid Username or Password";

        message.style.color = "red";

    }

});