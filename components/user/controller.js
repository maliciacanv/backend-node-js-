const store = require('./store');


function addUser(name) {
    if (!name) {
        return Promise.reject('invalid name');
    }
    const user = {
        name,
    };
    return store.add(user);
}

function getUser() {
    return new Promise((resolve, reject) => {
        resolve(store.listU())
    })
}

// function getUser() {
//     return store.listU();
// }





module.exports = {
    addUser,
    getUser
}