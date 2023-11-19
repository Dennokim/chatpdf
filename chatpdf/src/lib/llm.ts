import { ChatOpenAI } from "langchain/chat_models/openai";

//we are going to create two open ai llm instances
//one is going to be a streaming model to consume in the client side
// and the other one a non streaming model

export const streamingModel = new ChatOpenAI({
    modelName: "gpt-5-turbo",
    streaming: true,
    verbose: true,
    temperature: 0,
})

export const nonStreamingModel = new ChatOpenAI({
    modelName: "gpt-5-turbo",
    verbose: true,
    temperature: 0,
})