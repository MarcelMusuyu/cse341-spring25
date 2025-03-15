// const user={
//     name: 'Marcel Nyembo',
//     age: 25,
//     email: 'marcelnyembo@gmail.com'
// };

const mongodb = require('../database/database');







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


const createNewContact = async (req, res) => {
  const client = await mongodb.getClient();
  try {
    
    const newContact = req.body;
    const createdContact = await mongodb.createContact(client, newContact);
    if (!createdContact) {
      return res.status(500).json({ message: 'Failed to create contact' });
    }
    res.status(201).json(createdContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  } finally {
    await client.close();
  }
};

const updateContactById = async (req, res) => {
  const client = await mongodb.getClient();
 
  try {
    
    const updatedContact = await mongodb.updateContact(client, req.params.id, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found or update failed' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  } finally {
    await client.close();
  }
};

const deleteContactById = async (req, res) => {
  const client = await mongodb.getClient();
 
  try {
    const deletionResult = await mongodb.deleteContact(client, req.params.id);
    if (!deletionResult) {
      return res.status(404).json({ message: 'Contact not found or deletion failed' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await client.close();
  }
};




// // Create a new contact
// const createContact = async (req, res) => {
//   try {
//     const newContact = new Contact(req.body);
//     const savedContact = await newContact.save();
//     res.status(201).json(savedContact);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update a contact by ID
// const updateContactById = async (req, res) => {
//   try {
//     const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
//       new: true, // Return the modified document
//       runValidators: true, // Validate the update
//     });
//     if (!updatedContact) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }
//     res.json(updatedContact);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete a contact by ID
// const deleteContactById = async (req, res) => {
//   try {
//     const deletedContact = await Contact.findByIdAndDelete(req.params.id);
//     if (!deletedContact) {
//       return res.status(404).json({ message: 'Contact not found' });
//     }
//     res.json({ message: 'Contact deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



// const getContactById = (req, res) =>{
//     mongodb.connectDB().then(async()=>{
//         const user = await Contacts.findById(req.params.id);
//         res.send(user);
//     }).catch(console.error);
// }

module.exports = {
    getContacts,
    getContactById,
    createNewContact,
    deleteContactById,
    updateContactById,

};