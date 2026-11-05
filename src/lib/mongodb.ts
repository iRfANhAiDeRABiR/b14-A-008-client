import { MongoClient, Db } from "mongodb"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017"
const dbName = process.env.DB_NAME || "together_we_care"

declare global {
  var _mongoClient: MongoClient | undefined
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let client: MongoClient

if (!global._mongoClient) {
  client = new MongoClient(uri)
  global._mongoClient = client
  global._mongoClientPromise = client.connect()
} else {
  client = global._mongoClient
}

export const clientPromise: Promise<MongoClient> = global._mongoClientPromise!
export const db: Db = client.db(dbName)
export { client, dbName }
export default clientPromise
