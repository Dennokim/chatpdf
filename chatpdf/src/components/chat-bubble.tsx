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
