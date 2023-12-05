const {MongoClient} = require('mongodb');

// Adds the MongoDB URI aswell as collection info
const uri = 'mongodb+srv://noahkornberg:<password>@cluster0.nzqmezx.mongodb.net/Mey4VVyLS1I98lny'; 
const dbName = 'Dataset'; 
const collectionName = 'Dataset'; 

// Creates a new client
const client = new MongoClient(uri);

async function connectAndRunQueries() {
  try { 
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Queries two random values
    const query1 = await collection.find({Year: 2010}).limit(10).toArray();
    // console.log("Top selling books from 2010:");
    console.log(query1);


  } finally {
    await client.close();
  }
}

connectAndRunQueries().catch(console.error);