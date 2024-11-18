"use server";

import { BACKEND_URL } from "../constants";
import { updateTokens } from "../session";

export async function refreshToken(oldRefreshToken: string) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      body: JSON.stringify({ refresh: oldRefreshToken }),
    });

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    const { accessToken, refreshToken } = await response.json();

    await updateTokens({ accessToken, refreshToken });

    return accessToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    return null;
  }
}
