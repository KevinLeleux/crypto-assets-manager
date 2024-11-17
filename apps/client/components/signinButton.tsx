import { getSession } from "@/lib/session";
import { Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default async function SigninButton() {
  const session = await getSession();

  return (
    <Stack>
      {!session || !session.user ? (
        <>
          <Link href="/auth/signin">Signin</Link>
          <Link href="/auth/signup">Signup</Link>
        </>
      ) : (
        <Stack>
          <Text>{session.user.name}</Text>
          <Link href="/api/auth/signout">Signout</Link>
        </Stack>
      )}
    </Stack>
  );
}
