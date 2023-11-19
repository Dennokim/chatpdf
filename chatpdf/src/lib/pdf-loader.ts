import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { env } from "./config";
//we are going to chunk or split the pdf into smaller doc portions using the
//PDFLoader.
export async function getchunkedDocsFromPDF() {
  try {
    const loader = new PDFLoader(env.PDF_PATH);
    const docs = await loader.load();

    //we are then going to use the RecursiveCharacterTextSplitter to split the file text 
    //into a chunk size of 1000 and chunk overlap of 200 so as not to break in btwn th chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });

    const chunkedDocs = await textSplitter.splitDocuments(docs);
    return chunkedDocs;

  } catch (error) {
    console.error(error);
    throw new Error("failed to chunk the pdf");
  }
}
