import { Message } from "@/types/message";
import {
  FC,
  FormEvent,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
} from "react";
import { useUserStore } from "@/store/user-store";
import { Socket } from "socket.io-client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

interface ChatProps {
  socket: Socket;
  id: string;
}

const Chat: FC<ChatProps> = ({ id, socket }) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      author: "",
      message: `Welcome! You can invite friends to watch or play by sharing the link above. Have fun!`,
    },
  ]);
  const chatListRef = useRef<HTMLUListElement>(null);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    socket.on("sync-message", (message: Message) => {
      addMessage(message);
    });
  }, [socket]);

  function addMessage(message: Message) {
    setChatMessages((prev) => [...prev, message]);
  }

  function sendChat(message: string) {
    if (!user) return;

    socket.emit("message", id, user.username, message);
    addMessage({ author: user.username, message });
  }

  function chatClickSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const input = target.elements.namedItem("chat-input") as HTMLInputElement;
    if (!input.value || input.value.length == 0) return;
    sendChat(input.value);
    input.value = "";
  }

  function chatKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.key === "Enter") {
      const input = e.target as HTMLInputElement;
      if (!input.value || input.value.length == 0) return;
      sendChat(input.value);
      input.value = "";
    }
  }

  return (
    <div className="relative h-60 w-full min-w-fit">
      <div className="bg-base-300 flex h-full w-full min-w-[64px] flex-col pt-4">
        <ul
          className="mb-4 flex w-full h-full flex-col gap-1 overflow-y-scroll break-words"
          ref={chatListRef}
        >
          {chatMessages.map((m, i) => (
            <li
              className={
                "max-w-[30rem]" +
                (!m.author && m.author === "server"
                  ? " bg-base-content text-base-300 p-2"
                  : "")
              }
              key={i}
            >
              <span>
                {m.author && (
                  <span>
                    <a
                      className="font-bold text-primary link-hover"
                      href={`/@${m.author}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {m.author}
                    </a>
                    :{" "}
                  </span>
                )}
                <span>{m.message}</span>
              </span>
            </li>
          ))}
        </ul>
        <form className="flex w-full mt-auto" onSubmit={chatClickSend}>
          <Input
            type="text"
            placeholder="Chat here..."
            name="chat-input"
            id="chat-input"
            onKeyUp={chatKeyUp}
            required
          />
          <Button className="ml-1" type="submit" variant={"outline"}>
            <Send className="w-4 h-4" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
