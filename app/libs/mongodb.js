import { MongoClient } from "mongodb";

const clientPromise = () => {
  const MONGODB_URL = process.env.NEXT_PUBLIC_MONGODB_URL;
  const options = {};

  // check mongodb url connect or not
  if (!MONGODB_URL) {
    throw new Error('Invalid/Missing enviroment variable: "MONGODB_URL"');
  }

  const client = new MongoClient(MONGODB_URL, options);
  return client.connect();
};

export default clientPromise;
