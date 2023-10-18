const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const PORT = 4000;

const dbURL = 'mongodb+srv://jacksondunnigan:tVtEMZw9rQYEj5Jw@cluster0.obq2fwx.mongodb.net/';

let db;
let dbName = "BookSales";

// Connect to MongoDB
const connectToMongo = async () => {
    try {
        const client = await MongoClient.connect(dbURL);
        db = client.db(dbName);
        dbCollection = db.collection(dbName);
        console.log('Connected to MongoDB');
        startServer();
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
};

// Start Express Server
const startServer = () => {
    app.use(express.static('public'));
}
// Default route
app.get('/', function(req, res){
    res.sendFile(__dirname+'/public/index.html');
    console.log("connected");
});


// Handling queries
app.get('/query', async (req, res) => {

    try {
        const Year = parseInt(req.query.year);
        const Genre = req.query.genre;
        const Price = parseInt(req.query.price);
        
        // MongoDB query
        const query = {
            Year,
            Genre,
            Price
        };          

        // Execute the query against the MongoDB collection
        const queryResult = await dbCollection.find(query).toArray();//(err, result) => {
        console.log(queryResult);
        res.send(queryResult);

    } catch(err) {
        console.error('Error while handling search:', err);
        res.send('Server Error');
    }
});

    app.listen(PORT, () => {
        console.log('Server is running on http://localhost:'+PORT);
    });
// };
connectToMongo();