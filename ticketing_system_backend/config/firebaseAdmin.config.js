const admin = require('firebase-admin');
var serviceAccount = require("../ticketingsystem-e5212-firebase-adminsdk-fbsvc-1d5c37790b.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
