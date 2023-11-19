import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./config";

export async function getPineconeClient() {
  // Initialize the Pinecone client
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
    environment: process.env.PINECONE_ENVIRONMENT!,
  });

  // Create the index
  try {
    await pinecone.createIndex({
      name: "chatpdf",
      dimension: 1536,
      metric: "cosine",
    });
    console.log(
      `Waiting for ${env.INDEX_INIT_TIMEOUT} seconds for index initialization to complete...`
    );
    setTimeout(() => {}, env.INDEX_INIT_TIMEOUT * 1000);
  } catch (err) {
    console.log("Error creating index");
  }

  // Return the Pinecone client
  return pinecone;
}
