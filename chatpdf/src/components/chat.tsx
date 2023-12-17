"use client";

import { Button } from "./ui/button";
import { ChatBubble } from "./chat-bubble";
import { Input } from "./ui/input";
import { Message } from "ai";
import { useChat } from "ai/react";
import { initialMessages } from "@/lib/utils";
import { Spinner } from "./ui/spinner";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages,
  });

  return (
    <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto">
        {/* we will map over each Message in messages taking in its id, role, content from the ChatBubble */}
        {messages.map(({ id, role, content }: Message, index) => (
          <ChatBubble
            key={id}
            role={role}
            content={content}
            //sources={role != "assistant" ? [] : sources}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex clear-both">
        <Input
          placeholder="Type here to chat with the AI..."
          className="mr-2"
          value={input}
          onChange={handleInputChange}
        />
        <Button type="submit" className="w-24">
          {isLoading ? <Spinner/> : "Ask"}
        </Button>
      </form>
    </div>
  );
}
