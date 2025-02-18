import { z } from "zod";

export const createWorkspaceSchema = z.object({
	name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres"),
	image: z
		.union([
			z.instanceof(File),
			z.string().transform((value) => (value === "" ? undefined : value)),
		])
		.optional(),
});
export const updateWorkspaceSchema = z.object({
	name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres").optional(),
	image: z
		.union([
			z.instanceof(File),
			z.string().transform((value) => (value === "" ? undefined : value)),
		])
		.optional(),
});
