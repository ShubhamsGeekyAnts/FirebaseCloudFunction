const functions = require('firebase-functions');
const app = require('./https');


exports.curdApp = functions.https.onRequest(app);