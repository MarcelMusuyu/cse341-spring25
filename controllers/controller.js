// const user={
//     name: 'Marcel Nyembo',
//     age: 25,
//     email: 'marcelnyembo@gmail.com'
// };

const mongodb = require('../database/database');
const Contacts = require('../models/contacts');
const User = require('../models/contacts');






const getContacts = async (req, res, next) => {
  try {
      const client = await mongodb.getClient();
      if (!client) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }
      const lists = await mongodb.getContacts(client); // Directly get the array
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
  } catch (error) {
      console.error("Error in getContacts:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getContactById = async (req, res, next) => {
  try {
      const contactId = req.params.id;
      const client = await mongodb.getClient();
      if (!client) {
          res.status(500).json({ error: 'Internal Server Error' });
          return;
      }

      // Validation: Check if the ID is a valid 24-character hex string
      if (!/^[0-9a-fA-F]{24}$/.test(contactId)) {
        res.status(400).json({ error: 'Invalid contact ID' });
        return;
      }
      const result = await mongodb.findById(client, contactId); // Directly get the object or undefined
      if (result) {
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(result);
      } else {
          res.status(404).json({ error: 'Contact not found' });
      }
  } catch (error) {
      console.error("Error in getContactById:", error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const getContactById = (req, res) =>{
//     mongodb.connectDB().then(async()=>{
//         const user = await Contacts.findById(req.params.id);
//         res.send(user);
//     }).catch(console.error);
// }

module.exports = {
    getContacts,
    getContactById
};