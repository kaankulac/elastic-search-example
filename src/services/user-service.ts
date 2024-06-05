import UserModel from "models/user-model";
import { esClient, mongoClient } from "./database";

import { ObjectId } from "mongodb";

const db = mongoClient.db(process.env.MONGO_DB_NAME);
const userCollection = db.collection<UserModel>("users");

export async function createUser(user: UserModel): Promise<string> {
  const result = await userCollection.insertOne(user);
  return result.insertedId?.toHexString();
}

export async function getUserById(id: string): Promise<UserModel | null> {
  return userCollection.findOne({ _id: new ObjectId(id) });
}

export async function indexUser(id: string, user: UserModel): Promise<void> {
  await esClient.index({
    index: "users",
    id: id,
    body: user,
  });
}

export async function searchUser(query: object): Promise<UserModel[]> {
  const result = await esClient.search({
    index: "users",
    body: {
      query: {
        match: query,
      },
    },
  });

  return result.hits.hits.map((hit: any) => hit._source) as UserModel[];
}

