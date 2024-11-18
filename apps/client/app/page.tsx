import SigninButton from "@/components/signinButton";
import { getSession } from "@/utils/session";
import { Stack } from "@chakra-ui/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (!session || !session.user) redirect("/auth/signin");
  console.log({ session });
  return (
    <Stack>
      <SigninButton />
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/profile">Profile</Link>
    </Stack>
  );
}
