"use server";

import { redirect } from "next/navigation";
import { BACKEND_URL } from "../constants";
import { createSession } from "../session";
import { formSigninSchema } from "../validations/auth";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function formSigninAction(
  state: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const validationFields = formSigninSchema.safeParse(formData);

  if (!validationFields.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key]?.toString() ?? "";
    }
    return {
      message: "Données du formulaire invalides",
      fields,
      issues: validationFields.error.issues.map((issue) => issue.message),
    };
  }

  const response = await fetch(`${BACKEND_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    const result = await response.json();
    await createSession({
      user: { id: result.id, name: result.name },
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    redirect("/");
  } else {
    return {
      message:
        response.status === 401
          ? "Email ou mot de passe incorrect"
          : response.statusText,
    };
  }
}
