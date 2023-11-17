import { Button } from "./ui/button";
import { ChatBubble } from "./chat-bubble";
import { Input } from "./ui/input";
import { Message } from "ai";

export function Chat() {
  //since we don't have any messages we will use a dummy message
  const messages: Message[] = [
    { role: "assistant", content: "hey am your ai", id: "1" },
    { role: "user", content: "hi am the user", id: "2" },
  ];
  const sources = ["i am source 1", "i am source 2"];

  return (
    <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto">
        {/* we will map over each Message in messages taking in its id, role, content from the ChatBubble */}
        {messages.map(({ id, role, content }: Message, index) => (
          <ChatBubble
            key={id}
            role={role}
            content={content}
            sources={role != "assistant" ? [] : sources}
          />
        ))}
      </div>

      <form className="p-4 flex clear-both">
        <Input
          placeholder="Type here to chat with the AI..."
          className="mr-2"
        />
        <Button type="submit" className="w-24">
          Ask
        </Button>
      </form>
    </div>
  );
}
