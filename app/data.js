// pages/api/data.js

import { MongoClient } from 'mongodb';
const MONGO_URL = 'mongodb+srv://vkvikashkumar987:vkvikashkumar987@cluster0.ncpjepi.mongodb.net/'
console.log('i am db')
export default async function handler(req, res) {
     const client = new MongoClient(MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
     });

     try {
          await client.connect();
          const db = client.db('LearnQ');

          const collection = db.collection('question');
          const data = await collection.find({}).toArray();
          console.log(data)
          res.status(200).json(data);
     } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
     } finally {
          // Close the connection
          await client.close();
     }
}
