const admin = require('firebase-admin');
const {Firestore} = require('@google-cloud/firestore');

const db = new  Firestore();

class UsersModel {

    async getUsers (email){
        try{
            let data;
            if(email){
                data = (await db.collection('users')
                    .where('email' , '==', email)
                    .get()).docs;

            }else {
                data = (await db.collection('users').get()).docs;
            }

            return await Array.from(data, (dataToFilter) => {
                return {
                    name: dataToFilter._fieldsProto.name.stringValue,
                    email: dataToFilter._fieldsProto.email.stringValue,
                };
            });
        }catch (e) {
            throw e;
        }
    }

    async addUser (email, name){
        try{
            const res = await db.collection('users').doc().set({
                name,
                email,
            });
            return true;
        }catch (e) {
            throw e;
        }
    }

    async deleteUser (email){
        try{
            const docs = (await db.collection('users').where('email', '==', email).get()).docs;
            await docs.forEach((doc) => {
                doc.ref.delete();
            });

            return true;
        }catch (e) {
            throw e;
        }
    }

    async updateUser(email, {name}){
        if(!email){
            throw Error(`'email' is required`);
        }
        if(!name){
            throw Error(`'name' is required`);
        }
        const users = await db.collection('users').where('email', '==', email).get();
        let batch = db.batch();
        await users.forEach((user) => {
           const docRef = db.collection('users').doc(user.id);
           batch.update(docRef, {name});
        });
        await batch.commit();
        return true;
    }
}

module.exports = new UsersModel();