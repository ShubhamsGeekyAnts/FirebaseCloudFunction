const admin = require('firebase-admin');

// const serviceAccount = require('../.keys/splitkar-v0-firebase-adminsdk-fwgm8-a2d46f34e5');

admin.initializeApp();


const functions = require('firebase-functions');

const app = require('./https');
const {onCreate,onDelete} = require('./firestoreTrigger');


exports.curdApp = functions.https.onRequest(app);
exports.onUserCreate = onCreate;
exports.onUserDelete = onDelete;