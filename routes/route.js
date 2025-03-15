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

/** 
 * @swagger
 * /:
 * post:
 * summary: Create a new contact
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * email:
 * type: string
 * phone:
 * type: string
 * required:
 * - name
 * - email
 * - phone
 * responses:
 * 200:
 * description: Contact created
 * 500:
 * description: Internal Server Error
 */
routers.post('/', controller.createNewContact);

/**
 * @swagger
 * /{id}:
 * put:
 * summary: Update a contact by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * email:
 * type: string
 * phone:
 * type: string
 * required:
 * - name
 * - email
 * - phone
 * responses:
 * 200:
 * description: Contact updated
 * 400:
 * description: Invalid contact ID
 * 500:
 * description: Internal Server Error
 */

routers.put('/:id', controller.updateContactById);

/**
 * @swagger
 * /{id}:
 * delete:
 * summary: Delete a contact by ID
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Contact deleted
 * 400:
 * description: Invalid contact ID
 * 500:
 * description: Internal Server Error
 */
routers.delete('/:id', controller.deleteContactById);
module.exports = routers;
