const env = require("dotenv").config()
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const uri=process.env.MONGODB_URI;
//console.log(uri);

async function main(){
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to the database");
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


async function createContact(client, newContact){
    const result = await client.db("cse341contacts").collection("Contacts").insertOne(newContact);
    console.log(`New contact created with the following id: ${result.insertedId}`);
}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}


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
 

async function createListContacts(client, contacts){
     const result = await client.db("cse341contacts").collection("Contacts").insertMany(contacts);
     console.log(`${result.insertedCount} new contacts created `);
    console.log(`New contact created with the following id: ${result.insertedId}`);
}
module.exports = { main, findById, getContacts, getClient };

