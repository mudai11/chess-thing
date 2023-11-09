import axios, { AxiosError } from "axios";
import { headers } from "next/headers";
import { cache } from "react";
import { User } from "@/../../server/src/types";
import { env } from "../../env";

export const useServerSession = cache(async () => {
  const headersList = headers();
  const cookie = headersList.get("cookie");

  try {
    const { data } = await axios.get(`${env.SERVER_URL}/api/users/me`, {
      headers: {
        cookie: cookie,
      },
    });

    return data as User;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.data.error === "You're not logged in.") {
        return;
      }
    }
    console.log(e);
    return;
  }
});
