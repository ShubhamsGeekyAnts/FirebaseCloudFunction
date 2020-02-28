const db = require('./db');

const onError = async (e) => {
    await db.collection('logs')
        .doc('errorLogs')
        .collection('error')
        .doc()
        .set({
            timestamp: Date.now(),
            event: 'onCreate',
            message: e.message,
        });
};

module.exports = onError;