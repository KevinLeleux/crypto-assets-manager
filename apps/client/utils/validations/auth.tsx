import { z } from "zod";

export const formSignupSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }).trim(),
  email: z
    .string()
    .email({ message: "Veuillez entrer un email valide" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Doit contenir au moins 8 caractères" })
    .regex(/[a-zA-Z]/, { message: "Doit contenir au moins une lettre" })
    .regex(/[0-9]/, { message: "Doit contenir au moins un chiffre" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Doit contenir au moins un caractère spécial",
    })
    .trim(),
});

export const formSigninSchema = z.object({
  email: z
    .string()
    .email({ message: "Veuillez entrer un email valide" })
    .trim(),
  password: z
    .string()
    .min(1, { message: "Doit contenir au moins 1 caractère" })
    .trim(),
});
