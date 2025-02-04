import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Insira um e-mail válido"),
	password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

export const registerSchema = z.object({
	name: z.string().trim().min(3, "O nome deve ter no mínimo 3 caracteres"),
	email: z.string().email("Insira um e-mail válido"),
	password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});
