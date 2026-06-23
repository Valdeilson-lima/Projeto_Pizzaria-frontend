import { cookies } from "next/headers";

const COOKIE_NAME = "token";

export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
