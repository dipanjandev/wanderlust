import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFromServer = async () => {
  const myToken = await auth.api.getToken({
    headers: await headers(),
  });
  const token = myToken?.token;
  return token;
};
