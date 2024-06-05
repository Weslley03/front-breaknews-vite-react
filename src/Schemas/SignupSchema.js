import { z } from "zod";

export const SignupSchema = z.object({
  name: z
    .string()
    .min(2, { message: "o nome deve ter no mínimo 2 caracteres" })
    .transform((name) =>
      name //weslley felipe vilela => Weslley Felipe Vilela
        .trim()
        .split(" ")
        .map((palavra) => palavra[0].toUpperCase() + palavra.slice(1))
        .join(" ")
    ),
  email: z.string().email({ message: "e-mail inválido" }).toLowerCase(),
  password: z
    .string()
    .min(6, { message: "a senha deve ter no mínimo 6 caracteres" }),
  confirmpassword: z
    .string()
    .min(6, { message: "a senha deve ter no mínimo 6 caracteres" }),
}).refine((data) => data.password === data.confirmpassword, {
    message: 'as senhas não conferem',
    path: ['confirmpassword']
})
