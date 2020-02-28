const functions = require('firebase-functions');

const db = require('./db');
const onError = require('./errorhandler');

const onCreate = async (user) => {
    try{
        await db.collection('logs')
            .doc('newUserLogs')
            .collection('users')
            .doc(user.uid)
            .set({
                timestamp: Date.now(),
                event: 'onCreate',
                message: 'new user created',
                email: user.email,
                name: user.displayName,
            });
    }catch (e) {
        await onError(e);
    }
};

module.exports = functions.auth.user().onCreate(onCreate);