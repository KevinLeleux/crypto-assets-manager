import SigninButton from "@/components/signinButton";
import { Stack } from "@chakra-ui/react";
import Link from "next/link";

export default async function Home() {
  return (
    <Stack>
      <SigninButton />
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/profile">Profile</Link>
    </Stack>
  );
}
