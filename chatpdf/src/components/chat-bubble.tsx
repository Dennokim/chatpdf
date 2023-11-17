import Balancer from "react-wrap-balancer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Message } from "ai/react";
import ReactMarkdown from "@radix-ui/react-dropdown-menu";
import { formattedSourceText } from "@/lib/utils";

//we will map over each line in a text and wrap it inside a span and
//give each span a unique id and a line break after each line
const wrappedText = (text: string) => {
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));
};

//we will declare a new interface that will Borrow the properties from the
//Message interface imported from 'ai' (vercel-ai-sdk) plus a source property
//which is an array of string
interface ChatBubbleProps extends Partial<Message> {
  sources: string[];
}

//we declare a function that takes chatBubbleProps as its props and has the contents:
//(role set to assistant 'chatgpt' by default, the content and sources).
//if the content does exist we pass it to wrappedText to be split which is then passed to formattedMessage
// and if not return null.
export function ChatBubble({
  role = "assistant",
  content,
  sources,
}: ChatBubbleProps) {
  if (!content) {
    return null;
  }
  const formattedMessage = wrappedText(content);

  //we will build the card component
  return (
    <div className="">
      <Card className="mb-2">
        <CardHeader>
          <CardTitle
            className={
              role != "assistant"
                ? "text-amber-500 dark:text-amber-200"
                : "text-blue-500 dark:text-blue-200"
            }
          >
            {role == "assistant" ? "ai" : "You"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <Balancer>{formattedMessage}</Balancer>
        </CardContent>
        <CardFooter>
          <CardDescription className="w-full">
            {sources && sources.length ? (
              <Accordion type="single" collapsible className="w-full">
                {sources.map((source, index) => (
                  <AccordionItem value={`source-${index}`} key={index}>
                    <AccordionTrigger>{`Source ${index + 1}`}</AccordionTrigger>
                    <AccordionContent>
                      <ReactMarkdown linkTarget="_blank">
                        {formattedSourceText(source)}
                      </ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <></>
            )}
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
