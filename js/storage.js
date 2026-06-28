"use strict";

/* ===========================
   Project Constants
=========================== */

const ADMIN = {
    username: "admin",
    password: "admin123"
};

/* ===========================
   Storage Helper
=========================== */

const Storage = {

    /* Institutes */

    getInstitutes() {
        return JSON.parse(localStorage.getItem("institutes")) || [];
    },

    saveInstitutes(data) {
        localStorage.setItem("institutes", JSON.stringify(data));
    },

    /* Certificates */

    getCertificates() {
        return JSON.parse(localStorage.getItem("certificates")) || [];
    },

    saveCertificates(data) {
        localStorage.setItem("certificates", JSON.stringify(data));
    },

    /* Blockchain */

    getBlockchain() {
        return JSON.parse(localStorage.getItem("blockchain")) || [];
    },

    saveBlockchain(data) {
        localStorage.setItem("blockchain", JSON.stringify(data));
    },

    /* Logged Institute */

    getLoggedInstitute() {
        return JSON.parse(localStorage.getItem("loggedInstitute"));
    },

    setLoggedInstitute(data) {
        localStorage.setItem(
            "loggedInstitute",
            JSON.stringify(data)
        );
    },

    logoutInstitute() {
        localStorage.removeItem("loggedInstitute");
    }

};