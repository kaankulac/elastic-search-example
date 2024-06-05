import { Client } from "@elastic/elasticsearch";

export const esClient = new Client({ node: process.env.ELASTICSEARCH_URI });

export async function connectElasticsearch(): Promise<void> {
  await esClient.ping({}, { requestTimeout: 30000 });
  console.log("Connected to Elasticsearch");
}
