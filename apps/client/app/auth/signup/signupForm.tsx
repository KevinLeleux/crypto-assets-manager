"use client";

import { Field } from "@/components/ui/field";
import { formSignupAction } from "@/lib/actions/formSignup";
import { formSignupSchema } from "@/lib/validations/auth";
import { Button, Input, Stack, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SignupForm() {
  const [state, formAction] = useActionState(formSignupAction, { message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.output<typeof formSignupSchema>>({
    resolver: zodResolver(formSignupSchema),
    defaultValues: {
      name: "",
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
      onSubmit={(ev) => {
        ev.preventDefault();
        handleSubmit(() => {
          startTransition(() => {
            formAction(new FormData(formRef.current!));
          });
        })(ev);
      }}>
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
          invalid={!!errors.name}
          errorText={errors.name?.message}>
          <Input
            {...register("name")}
            placeholder="Nom"
          />
        </Field>
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
            placeholder="Mot de passe"
            type="password"
          />
        </Field>
        <Button
          type="submit"
          disabled={isSubmitting}>
          {isSubmitting ? "Inscription en cours" : "S'inscrire"}
        </Button>
      </Stack>
    </form>
  );
}
