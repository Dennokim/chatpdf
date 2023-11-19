import { getchunkedDocsFromPDF } from "@/lib/pdf-loader";
import { embedAndStoreDocs } from "@/lib/vectore-store";
import { getPineconeClient } from "@/lib/pinecone-client";

(async () => {
    try {
        const pinecone = await getPineconeClient();
        console.log('preparing chunks from pdf');
        const docs = await getchunkedDocsFromPDF();
        console.log(`loading ${docs.length} chunks into pinecone...`);
        //pass in the pinecone client and docs to embedAndStoreDocs for embedding
         await embedAndStoreDocs(pinecone, docs);
         console.log("data emebed and stored into pinecone");
    } catch (error) {
        console.error('init client script failed', error);
    }
})();