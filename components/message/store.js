// const list = [];

const Model = require('./model');

// mongodb+srv://db_user_chat:dbuserchat@cluster0-8idkn.mongodb.net/test


function addMessage(message) {
    // list.push(message);
    const myMessage = new Model(message);
    myMessage.save();
}

// const getMessage = async() => {
//         return await Model.find();
//     }
async function getMessage(filterUser) {
    return new Promise((resolve, reject) => {
        let filter = {};
        if (filterUser !== null) {
            filter = { user: filterUser };
        }
        Model.find(filter)
            .populate('user')
            .exec((err, populated) => {
                if (err) {
                    reject(err)
                    return false;
                }

                resolve(populated)
            });

    })
}

async function updateText(id, message) {
    const foundMessage = await Model.findOne({
        _id: id
    });

    foundMessage.message = message;
    const newMessage = await foundMessage.save();

    return newMessage;
}

function removeMessage(id) {
    return Model.deleteOne({
        _id: id
    });
}


module.exports = {
    add: addMessage,
    list: getMessage,
    updateText: updateText,
    remove: removeMessage,

    // get
    // update
    // delete
}