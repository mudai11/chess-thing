import axios, { AxiosError } from "axios";
import { env } from "@/../env";

export async function useClientSession() {
  try {
    const { data } = await axios.get(
      `${env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
      { withCredentials: true }
    );
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.data.error === "You're not logged in.") {
        return;
      }
    }
  }
}
