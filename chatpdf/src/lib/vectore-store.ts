import { Pinecone, PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { env } from "./config";

//we will create a function that will embed and store the documents
//that will accept a client(pinecone client) and the chunked docs.
export async function embedAndStoreDocs(
  pinecone: Pinecone,
  // @ts-ignore docs type error
  docs: Document<Record<string, any>>[]
) {
  try {
    //we will create a new embedding and pass in the index we created
    const embedding = new OpenAIEmbeddings();
    const index = pinecone.index(env.PINECONE_INDEX_NAME);

    //we will use the pinecone store and store them
    await PineconeStore.fromDocuments(docs, embedding, {
        pineconeIndex: index,
        //namespace: env.PINECONE_NAME_SPACE,
        textKey: 'text'
    })

  } catch (error) {
    console.error(error);
    throw new Error('failed to load your docs!')
  }
}

//create an api that gets and returns a vector store handle to be used as a retriever on langchain.
export async function getVectorStore(client: Pinecone){
  try {
     //we will create a new embedding and pass in the index we created
     const embedding = new OpenAIEmbeddings();
     const index = client.index(env.PINECONE_INDEX_NAME);

     //get the instance of the vectorStore from pinecone store
     const vectorStore = await PineconeStore.fromExistingIndex(embedding, {
      pineconeIndex: index,
      textKey: "text",
      namespace: env.PINECONE_NAME_SPACE
     });

     return vectorStore;
  } catch (error) {
    console.log("error", error);
    throw new Error("Something went wrong while getting vector store !");
  }
}