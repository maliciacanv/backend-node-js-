const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const upload = multer({
    dest: 'public/files/'
})

router.get('/', function(req, res) {
    const filterMessages = req.query.chat || null;
    controller.getMessage(filterMessages)
        .then((messageList) => {
            response.success(req, res, messageList, 200)
        })
        .catch(e => {
            response.error(req, res, 'unexpect errpr', 500, e)

        })
        // console.log(req.headers);
        // res.header({
        //         "custom-header": "nuestro valor personalizado"
        //     })
        // res.send('[lista de mensaje]');
        // response.success(req, res, 'lista de mensajes');
});

router.post('/', upload.single('file'), function(req, res) {
    // res.send('mensaje añadido');
    // console.log(req.query);

    controller.addMessage(req.body.chat, req.body.user, req.body.message, req.file)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 201);
        })
        .catch(e => {
            response.error(req, res, 'error inesperado info invalida', 400, 'error en el sisitem')
        })

    // if (req.query.error == 'ok') {
    //     response.error(req, res, 'error inesperado', 500, 'es solo una simulacionde los errores')
    // } else {
    //     response.success(req, res, 'creado correctamente', 201);
    // }
    // console.log(req.body);
    // response.success(req, res, 'creado correctamente', 201);
});

router.patch('/:id', function(req, res) {
    console.log(req.params.id)

    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(e => {
            response.error(req, res, 'error interno', 500, e)
        });
})

router.delete('/:id', function(req, res) {
    // res.send('mensaje' + req.body.text + 'rep elimindao');
    // res.send();
    // res.status(201).send();
    // res.status(201).send([{ error: '', body: 'creado correctamente' }]);
    // respuesta con array, objetos y ambos;

    controller.deleteMessage(req.params.id)
        .then(() => {
            response.success(req, res, `usuario ${req.params.id} eliminado`, 200)
        })
        .catch(e => {
            response.error(req, res, ' error interno', 500, e)
        })
});

module.exports = router;