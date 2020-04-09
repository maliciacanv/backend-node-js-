const store = require('./store');

function addChat(users) {
    console.log(users)
    if (!users || !Array.isArray(users)) {
        return Promise.reject('invalid user list')
    }

    const chat = {
        users: users
    }
    return store.add(chat)
}

function getChats(userId) {
    return store.list(userId);
}

module.exports = {
    addChat,
    getChats
}