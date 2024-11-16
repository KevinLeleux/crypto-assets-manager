"use client";

import { Button, Stack } from "@chakra-ui/react";

export default function SignupForm() {
  return (
    <Stack
      maxW={400}
      as="form">
      <Button type="submit">Se connecter</Button>
    </Stack>
  );
}
