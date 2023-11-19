import { Pinecone } from "@pinecone-database/pinecone";
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
