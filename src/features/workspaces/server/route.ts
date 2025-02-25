import { Hono } from "hono";
import { ID, Query } from "node-appwrite";
import { zValidator } from "@hono/zod-validator";

import { MemberRole } from "@/features/members/types";
import { getMember } from "@/features/members/utils";

import { sessionMiddleware } from "@/lib/sesssion-middleware";
import { DATABASE_ID, IMAGES_BUCKET_ID, MEMBERS_ID, WORKSPACE_ID } from "@/config";

import { createWorkspaceSchema, updateWorkspaceSchema } from "../schemas";

const app = new Hono()
	.get("/", sessionMiddleware, async (c) => {
		const user = c.get("user");
		const databases = c.get("databases");

		const members = await databases.listDocuments(
			DATABASE_ID,
			MEMBERS_ID,
			[Query.equal("userId", user.$id)]
		)

		if (members.total === 0) {
			return c.json({ data: { documents:[], total: 0 } });
		}
		
		const workspaceIds = members.documents.map((member) => member.workspaceId);

		const workspaces = await databases.listDocuments(
			DATABASE_ID, 
			WORKSPACE_ID,
			[
				Query.orderDesc("$createdAt"),
				Query.contains("$id", workspaceIds)
			]
		);

		return c.json({ data: workspaces });
	})
	.post(
		"/",
		zValidator("form", createWorkspaceSchema),
		sessionMiddleware,
		async (c) => {
			const databases = c.get("databases");
			const storage = c.get("storage");
			const user = c.get("user");

			const { name, image } = c.req.valid("form");

			let uploadedImageUrl: string | undefined;

			if (image instanceof File) {
				const file = await storage.createFile(
					IMAGES_BUCKET_ID,
					ID.unique(),
					image,
				);

				const arrayBuffer = await storage.getFilePreview(
					IMAGES_BUCKET_ID,
					file.$id,
				);

				uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
			}

			const workspaces = await databases.createDocument(
				DATABASE_ID,
				WORKSPACE_ID,
				ID.unique(),
				{
					name,
					userId: user.$id,
					imageUrl: uploadedImageUrl,
				},
			);

			await databases.createDocument(
				DATABASE_ID,
				MEMBERS_ID,
				ID.unique(),
				{
					userId: user.$id,
					workspaceId: workspaces.$id,
					role: MemberRole.ADMIN
				},
			);

			return c.json({ data: workspaces });
		},
	)
	.patch(
		"/:workspaceId",
		sessionMiddleware,
		zValidator("form", updateWorkspaceSchema),
		async (c) => {
			const databases = c.get("databases");
			const storage = c.get("storage");
			const user = c.get("user");

			const { workspaceId } = c.req.param();
			const { name, image} = c.req.valid("form");

			const member = await getMember({
				databases,
				workspaceId,
				userId: user.$id,
			});

			if (!member || member.role !== MemberRole.ADMIN) {
				return c.json({ error: "Unauthorized" }, 401);
			}

				let uploadedImageUrl: string | undefined;

			if (image instanceof File) {
				const file = await storage.createFile(
					IMAGES_BUCKET_ID,
					ID.unique(),
					image,
				);

				const arrayBuffer = await storage.getFilePreview(
					IMAGES_BUCKET_ID,
					file.$id,
				);

				uploadedImageUrl = `data:image/png;base64,${Buffer.from(arrayBuffer).toString("base64")}`;
			} else {
				uploadedImageUrl = image;
			}

			const workspaces = await databases.updateDocument(
				DATABASE_ID,
				WORKSPACE_ID,
				workspaceId,
				{
					name,
					imageUrl: uploadedImageUrl,
				}
			);

			return c.json({ data: workspaces });
		}
	);

export default app;
