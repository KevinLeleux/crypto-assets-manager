import { HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import SigninForm from "./signinForm";

export default function SigninPage() {
  return (
    <div>
      <h1>Signin</h1>
      <SigninForm />
      <HStack>
        <Text>Vous n'avez pas de compte ?</Text>
        <Link href="/auth/signup">Signup</Link>
      </HStack>
    </div>
  );
}
