"use server";

import { formSignupSchema } from "@/lib/validations/formSignup";
import { redirect } from "next/navigation";
import { BACKEND_URL } from "../constants";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function formSignupAction(
  state: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const validationFields = formSignupSchema.safeParse(formData);

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

  const response = await fetch(`${BACKEND_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validationFields.data),
  });

  if (response.ok) {
    redirect("/auth/signin");
  } else {
    return {
      message:
        response.status === 409
          ? "L'utilisateur existe déjà"
          : "Erreur lors de l'inscription",
    };
  }
}
