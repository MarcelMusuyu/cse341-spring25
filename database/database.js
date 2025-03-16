const env = require("dotenv").config()
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const uri = process.env.MONGODB_URI;
//console.log(uri);

async function main(){
    const client = new MongoClient(uri);
    try {
        await client.connect();
       
        //await listDatabases(client);
        // return client.db();

        const newContact = {
            firstName: "Museng",
            lastName: "Mark",
            email: "markmuseng@gmail.com",
            favoriteColor: "yellow",
            birthDate: new Date('13/06/1998')
        };
        //  await createContact(client, newContact);
    } catch (e) {
        console.error(e);
        throw e;
    } finally {
         await client.close();
    }
}


// async function createContact(client, newContact){
//     const result = await client.db("cse341contacts").collection("Contacts").insertOne(newContact);
//     console.log(`New contact created with the following id: ${result.insertedId}`);
// }

// async function listDatabases(client){
//     const databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// }


async function getClient(){
    const client = new MongoClient(uri);
    try {
        await client.connect();
       
       
        return client;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


async function findById(client,id){
  
        try {
            const objectId = new ObjectId(id); // Convert id to ObjectId
            const result = await client.db("cse341contacts").collection("Contacts").findOne({ _id: objectId });
    
            if (result) {
                return result;
            } else {
                return undefined; // Or null, if you prefer
            }
        } catch (error) {
            console.error("Error in findById:", error);
            return undefined; // Or null, if you prefer
        }
    }
 

async function getContacts (client){
    try {
        const results = await client.db("cse341contacts").collection("Contacts").find().toArray();
        return results;
    } catch (error) {
        console.error("Error in getContacts:", error);
        return []; // Return an empty array on error
    }
}
 

async function createContact(client, newContact) {
  try {
    const result = await client.db("cse341contacts").collection("Contacts").insertOne(newContact);

    if (result.insertedId) {
      return { _id: result.insertedId, newContact }; // Return the inserted document with _id
    } else {
      return undefined; // Or null, indicating insertion failed
    }
  } catch (error) {
    console.error("Error in createContact:", error);
    return undefined; // Or null, indicating an error occurred
  }
}


async function updateContact(client, id, updatedContact) {
  try {
    const objectId = new ObjectId(id);
    console.log(id);
   
    const result = await client.db("cse341contacts").collection("Contacts").updateOne(
      { _id: objectId },
      { $set: updatedContact });

       console.log(result);

    if (result.modifiedCount) {
      return result.modifiedCount; // Indicate successful update
    } else {
      return undefined; // Or null, indicating the contact wasn't found or update failed
    }
  } catch (error) {
    console.error("Error in updateContact:", error);
    return undefined; // Or null, indicating an error occurred
  }
}

async function deleteContact(client, id) {
  try {
    const objectId = new ObjectId(id);
    const result = await client.db("cse341contacts").collection("Contacts").deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      return { deletedCount: 1 }; // Indicate successful deletion
    } else {
      return undefined; // Or null, indicating the contact wasn't found or deletion failed
    }
  } catch (error) {
    console.error("Error in deleteContact:", error);
    return undefined; // Or null, indicating an error occurred
  }
}

// async function createListContacts(client, contacts){
//      const result = await client.db("cse341contacts").collection("Contacts").insertMany(contacts);
//      console.log(`${result.insertedCount} new contacts created `);
//     console.log(`New contact created with the following id: ${result.insertedId}`);
// }
module.exports = { main, findById, getContacts, getClient, createContact, updateContact, deleteContact };

