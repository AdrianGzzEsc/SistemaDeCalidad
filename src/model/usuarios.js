const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    fName: {
        type: String,
        require: true
    },
    lName: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    superuser: {
        type: Boolean,
        require: true
    }
});

const userModel = mongoose.model('users', userSchema);

const Users = {
    createUser: function(newUser) {
        return userModel
            .create(newUser)
            .then(user => {
                return user;
            })
            .catch(err => {
                throw new Error(err.message);
            });
    },
    getUserByEmail: function(email) {
        return userModel
            .findOne({ email })
            .then(user => {
                return user;
            })
            .catch(err => {
                throw new Error(err.message);
            });
    },
    updateUser: function(data) {
        const id = { id: data.id };
        return userModel
            .updateOne(id, data)
            .then(result => {
                return result;
            })
            .catch(err => {
                return err;
            })
    },
    getUsers: function() {
        return userModel
            .find()
            .then(users => {
                return user;
            })
            .catch(err => {
                throw new Error(err.message);
            })
    },
    eraseUser: function(userID) {
        let filter = { id: userID };
        return userModel
            .deleteOne(filter)
            .then(result => {
                return result
            })
            .catch(err => {
                return err;
            })
    }
}

module.exports = {
    Users,
    userModel
};