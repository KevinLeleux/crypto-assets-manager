"use server";

import { BACKEND_URL } from "../constants";
import { getSession } from "../session";

export default async function getProfile() {
  const session = await getSession();
  const response = await fetch(`${BACKEND_URL}/auth/protected`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });
  const result = await response.json();
  return result;
}
