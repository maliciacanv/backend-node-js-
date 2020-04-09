const store = require('./store');
const socket = require('../../socket').socket;


function addMessage(chat, user, message, file) {
    console.log(file)
    return new Promise((resolve, reject) => {
        if (!chat || !user || !message) {
            console.error('[messageController] no hya usuario o mensaje')
            reject('datos incorrectos');
            return false;
        }

        let fileUrl = '';
        if (file) {
            fileUrl = 'http://localhost:3000/app/files/' + file.filename;
        }

        const fullMessage = {
            chat: chat,
            user: user,
            message: message,
            date: new Date(),
            file: fileUrl,
        }

        store.add(fullMessage)
        socket.io.emit('message', fullMessage)

        resolve(fullMessage);
    })
}

function getMessage(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    })
}

function updateMessage(id, message) {
    return new Promise(async(resolve, reject) => {
        if (!id || !message) {
            reject('invalid data');
            return false;
        }

        const result = await store.updateText(id, message);

        resolve(result);
    })
}

function deleteMessage(id) {
    return new Promise(async(resolve, reject) => {
        if (!id) {
            reject('invalid data');
            return false;
        }

        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            })

    })
}


module.exports = {
    addMessage,
    getMessage,
    updateMessage,
    deleteMessage
}