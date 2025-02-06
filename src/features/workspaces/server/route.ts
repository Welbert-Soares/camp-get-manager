import { Hono } from "hono";
import { ID } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";

import { DATABASE_ID, WORKSPACE_ID } from "@/config";
import { createWorkspaceSchema } from "../schemas";
import { sessionMiddleware } from "@/lib/sesssion-middleware";

const app = new Hono().post(
	"/",
	zValidator("json", createWorkspaceSchema),
	sessionMiddleware,
	async (c) => {
		const databases = c.get("databases");
		const user = c.get("user");

		const { name } = c.req.valid("json");

		const workspaces = await databases.createDocument(
			DATABASE_ID,
			WORKSPACE_ID,
			ID.unique(),
			{
				name,
				userId: user.$id,
			},
		);

		return c.json({ data: workspaces });
	},
);

export default app;
