const Model = require('./model');

function addUser(user) {
    const myUser = new Model(user);
    return myUser.save();
}

function getUser() {
    const listUser = Model.find();
    return listUser;
}


module.exports = {
    add: addUser,
    listU: getUser
}