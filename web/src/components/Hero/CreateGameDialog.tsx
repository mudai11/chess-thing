import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useCallback, useState } from "react";
import StartGameButton from "./StartGameButton";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/store";
import { env } from "@/../env";
import axios, { AxiosError } from "axios";
import { Icons } from "../Icons";
import { toast } from "@/hooks/useToast";

export function CreateLobbyDialog() {
  const [side, setSide] = useState<string>("White");
  const [loading, setLoading] = useState<boolean>(false);
  const user = useUserStore.use.user();
  const { push } = useRouter();
  const handleSideChange = useCallback((value: string) => {
    setSide(value);
  }, []);

  const handleCreateLobby = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${env.NEXT_PUBLIC_SERVER_URL}/api/games/create-game`,
        {
          id: user?.id!,
          side: side.toLocaleLowerCase(),
        },
        {
          withCredentials: true,
        }
      );
      push(`/game/${data.message}`);
      toast({
        title: "Game lobby created, redirecting...",
        description: "A game lobby is successfully created.",
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        toast({
          title: "We have a little problem.",
          description: e.response?.data.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "An error has occured !",
          description: "Could not sign you out right now, try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <StartGameButton />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a game lobby</DialogTitle>
          <DialogDescription>Choose a side and submit.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="side" className="text-right">
              Side :
            </Label>
            <Select onValueChange={handleSideChange} defaultValue={side}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="White">White</SelectItem>
                <SelectItem value="Black">Black</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateLobby} disabled={loading}>
            {loading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Loading" : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
