const routers= require('express').Router();
const controller = require('./controller/service');
routers.get('/', controller.getUser);
routers.get('/name', controller.getName);
routers.get('/email', controller.getEmail);
module.exports = routers;