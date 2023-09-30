import axios, { AxiosError } from "axios";
import { headers } from "next/headers";

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
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.response?.data.error === "You're not logged in.") {
        return;
      }
    }
  }
}
