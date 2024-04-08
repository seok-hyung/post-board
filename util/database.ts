import { MongoClient } from 'mongodb';
const url =
  'mongodb+srv://admin:546871@cluster0.2oxof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const options: any = { useNewUrlParser: true, useUnifiedTopology: true };
let connectDB: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongo) {
    global._mongo = new MongoClient(url, options).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url, options).connect();
}
export { connectDB };
