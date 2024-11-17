"use client";

import { Field } from "@/components/ui/field";
import { formSigninAction } from "@/lib/actions/formSignin";
import { formSigninSchema } from "@/lib/validations/auth";
import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SigninForm() {
  const [state, formAction] = useActionState(formSigninAction, { message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.output<typeof formSigninSchema>>({
    resolver: zodResolver(formSigninSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(state.fields ?? {}),
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit((_, event) => {
        event?.preventDefault();
        formRef.current?.submit();
      })}>
      <Stack>
        {state.message !== "" && !state.issues && (
          <Text color="red.500">{state.message}</Text>
        )}
        {state?.issues && (
          <Stack>
            {state.issues.map((issue, index) => (
              <Text
                key={index}
                color="red.500">
                {issue}
              </Text>
            ))}
          </Stack>
        )}
        <Field
          invalid={!!errors.email}
          errorText={errors.email?.message}>
          <Input
            {...register("email")}
            placeholder="Email"
            type="email"
          />
        </Field>
        <Field
          invalid={!!errors.password}
          errorText={errors.password?.message}>
          <Input
            {...register("password")}
            placeholder="Password"
            type="password"
          />
        </Field>
        <Link href="#">Mot de passe oublié ?</Link>
        <Button type="submit">
          {isSubmitting ? "Connexion en cours" : "Se connecter"}
        </Button>
      </Stack>
    </form>
  );
}
