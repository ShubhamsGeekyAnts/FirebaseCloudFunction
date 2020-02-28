const { addUser, deleteUser, getUsers, updateUser } = require('../models/users.model');
class UsersController {

    async getUsers(req, res, next){
        try{
            const { id } = req.params;
            if(!id) {
                const data = await getUsers();
                return res.send({
                   hasError: false,
                   data
                });
            } else {
                console.log(id);
                const data = await getUsers(id);
                return res.send({
                    hasError: false,
                    data
                });
            }
        }catch (e) {
            res.status(500);
            return next(e);
        }
    }

    async addUser(req, res, next){
        try{
            const {email, name} = req.body;
            await addUser(email, name);
            return res.send({
               hasError: false,
               message: 'successfully added',
            });
        }catch (e) {
            res.status(500);
            return next(e);
        }
    }

    async deleteUser(req, res, next){
        try{
            const {id} = req.params;
            const isDeleted = await deleteUser(id);
            if(isDeleted){
                return res.send({
                    hasError: false,
                    message: 'successfully deleted'
                });
            } else {
                res.status(412);
                return next(Error('user not found'));
            }
        }catch (e) {
            res.status(500);
            return next(e);
        }
    }

    async updateUser(req, res, next){
        try{
            const {id} = req.params;
            const {name} = req.body;
            await updateUser(id, {name});
            return res.send({
                hasError: false,
                message: 'successfully updated'
            });
        }catch (e) {
            res.status(500);
            return next(e);
        }
    }

}

module.exports = new UsersController();