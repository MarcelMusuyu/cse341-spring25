const routers= require('express').Router();
const controller = require('../controllers/controller');

routers.get('/', controller.getContacts);
routers.get('/:id', controller.getContactById);

module.exports = routers;