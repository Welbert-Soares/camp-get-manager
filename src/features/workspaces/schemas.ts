import { z } from "zod";

export const createWorkspaceSchema = z.object({
	name: z.string().trim().min(3, "Nome deve ter no mínimo 3 caracteres"),
});
