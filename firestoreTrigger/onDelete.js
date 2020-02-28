const functions = require('firebase-functions');

const db = require('./db');
const onError = require('./errorhandler');

const onDelete = async (user) => {
    try{
        console.log('Deleting user...');
        await db.collection('logs')
            .doc('deletedUserLogs')
            .collection('users')
            .doc(user.uid).set({
                timestamp: Date.now(),
                event: 'onDelete',
                message: 'user deleted',
                email: user.email,
                name: user.displayName,
            });
        await (await db.collection('logs')
            .doc('newUserLogs')
            .collection('users')
            .doc(user.uid)
            .get()
        ).ref.delete();
        console.log('Deleted user...');
    }catch (e) {
        await onError(e);
    }
};

module.exports = functions.auth.user().onDelete(onDelete);