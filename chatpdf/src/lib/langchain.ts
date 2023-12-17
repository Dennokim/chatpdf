import { ConversationalRetrievalQAChain } from "langchain/chains";
import { getVectorStore } from "./vectore-store";
import { getPineconeClient } from "./pinecone-client";
import {
  StreamingTextResponse,
  experimental_StreamData,
  LangChainStream,
} from "ai";
import { streamingModel, nonStreamingModel } from "./llm";
import { STANDALONE_QUESTION_TEMPLATE, QA_TEMPLATE } from "./prompt-templete";
import { Pinecone } from "@pinecone-database/pinecone";

//create th call chain arg that will have the question and chat history
type callChainArgs = {
    question: string;
    chatHistory: string;
}

//create the call chain function
export async function callChain({question, chatHistory}: callChainArgs) {
    try {
        //sanitize the question(cleaning it up), get the already created pineconeClient and pass it to the vector store
        const sanitizedQuestion = question.trim().replaceAll("\n", " ");
        const pineconeClient = await getPineconeClient();
        const vectorStore = await getVectorStore(pineconeClient);
        //use the stream from ai sdk
        const { stream, handlers } = LangChainStream({
            experimental_streamData: true,
          });
          const data = new experimental_StreamData();
      
          const chain = ConversationalRetrievalQAChain.fromLLM(
            streamingModel,
            vectorStore.asRetriever(),
            {
              qaTemplate: QA_TEMPLATE,//final answer
              questionGeneratorTemplate: STANDALONE_QUESTION_TEMPLATE,
              returnSourceDocuments: true, //default 4
              questionGeneratorChainOptions: {
                llm: nonStreamingModel,
              },
            }
          );

          //call the chain by passing in the question and the history and pass in the handlers gotten from the ai-sdk
          //when creating the stream.
          chain.call(
            {
                question: sanitizedQuestion,
                chat_history: chatHistory,
            },
            [handlers]
          )

          //return the readable stream
          return new StreamingTextResponse(stream, {}, data);
    } catch (error) {
        console.log(error);
        throw new Error("Call chain method failed to execute successfully!!");
    }
}