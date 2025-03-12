const routers= require('express').Router();
const controller = require('../controllers/controller');


/**
 * @swagger
 * /:
 * get:
 * summary: Get all contacts
 * responses:
 * 200:
 * description: List of contacts
 * 500:
 * description: Internal Server Error
 */
routers.get('/', controller.getContacts);

/**
 * @swagger
 * /{id}:
 * get:
 * summary: Get a contact by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Contact found
 * 400:
 * description: Invalid contact ID
 * 404:
 * description: Contact not found
 * 500:
 * description: Internal Server Error
 */
routers.get('/:id', controller.getContactById);

module.exports = routers;