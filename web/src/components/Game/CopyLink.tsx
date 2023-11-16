import { FC, useState } from "react";
import { Button } from "../ui/button";
import { useLobbyStore } from "@/store/lobby-store";
import { Copy, CopyCheckIcon } from "lucide-react";
import { env } from "@/../env";

interface CopyLinkProps {
  id: string;
}

const CopyLink: FC<CopyLinkProps> = ({ id }) => {
  const lobby = useLobbyStore((state) => state.lobby);
  const [copied, setCopied] = useState(false);

  function copyInvite() {
    const text = `${env.NEXT_PUBLIC_CLIENT_URL}/${
      lobby.end_reason ? `archive/${id}` : `game/${id}`
    }`;
    if ("clipboard" in navigator) {
      navigator.clipboard.writeText(text);
    } else {
      document.execCommand("copy", true, text);
    }

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  return (
    <div className="mb-2 flex w-full flex-row gap-2 items-center justify-start">
      {lobby.end_reason ? "Archived link:" : "Invite friends:"}
      <div>
        {copied ? (
          <Button
            className="flex flex-row justify-center items-center p-3 gap-1 h-8 text-xs sm:h-5 sm:text-sm"
            variant={"ghost"}
          >
            <CopyCheckIcon size={16} />
            Copied
          </Button>
        ) : (
          <Button
            className="flex flex-row justify-center items-center p-3 gap-1 h-8 text-xs sm:h-5 sm:text-sm"
            onClick={copyInvite}
            variant={"ghost"}
          >
            <Copy size={16} />
            Copy link
          </Button>
        )}
      </div>
    </div>
  );
};

export default CopyLink;
