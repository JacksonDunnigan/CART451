const {MongoClient} = require('mongodb');

// Adds the MongoDB URI aswell as collection info
const uri = 'mongodb+srv://jacksondunnigan:tVtEMZw9rQYEj5Jw@cluster0.obq2fwx.mongodb.net/'; 
const dbName = 'BookSales'; 
const collectionName = 'BookSales'; 

// Creates a new client
const client = new MongoClient(uri);

async function connectAndRunQueries() {
  try { 
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);


    // Queries the best selling books of 2010
    const query1 = await collection.find({Year: 2010}).limit(10).toArray();
    console.log("Top selling books from 2010:");
    console.log(query1);


    // Queries the best selling non fiction books
    const query2 = await collection.find({Genre: "Non Fiction"}).limit(10).toArray();
    console.log("Top selling non fiction books:");
    console.log(query2);
        
    // Aggregates the average user rate for each genre
    const query3 = await collection.aggregate([
      { $group: { _id: '$Genre', avg_user_rating: { $avg: '$User Rating' }}}
    ]).toArray();
    console.log("Average user rate for each genre:");
    console.log(query3);

    // Aggregates the books with the most reviews
    const query4 = await collection.aggregate([
      { $sort: { Reviews: -1 }}]).limit(10).toArray();;

    console.log("The books with the most reviews:");
    console.log(query4);


    // Aggregate the average price of books for each author
    const query5 = await collection.aggregate([
      { $group: { _id: '$Author', avg_price: { $avg: '$Price' } } },
      { $sort: { avg_price: -1 } }, 
      ]).toArray();
    console.log("The average price of books for each author:");
    console.log(query5);

  } finally {
    await client.close();
  }
}

connectAndRunQueries().catch(console.error);