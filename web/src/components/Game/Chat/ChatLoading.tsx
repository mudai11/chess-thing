import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Send } from "lucide-react";

const ChatLoading = () => {
  return (
    <div className="relative h-60 w-full min-w-fit">
      <div className="bg-base-300 flex h-full w-full min-w-[64px] flex-col pt-4">
        <ul className="mb-4 flex w-full h-full flex-col gap-1 overflow-y-scroll break-words">
          <li className="max-w-[30rem]">
            <span>
              <span>Entering lobby, please wait...</span>
            </span>
          </li>
        </ul>
        <form className="flex w-full mt-auto">
          <Input
            type="text"
            placeholder="Chat here..."
            name="chat-input"
            id="chat-input"
            disabled
            required
          />
          <Button className="ml-1" type="submit" variant="outline" disabled>
            <Send className="w-4 h-4" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatLoading;
