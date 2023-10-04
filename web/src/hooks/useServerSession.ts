import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import User from "@/../../server/src/types";

export async function useServerSession() {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
      {
        headers: {
          cookie: cookie,
        },
      }
    );

    return data as User;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.data.error === "You're not logged in.") {
        return;
      }
    }
  }
}
