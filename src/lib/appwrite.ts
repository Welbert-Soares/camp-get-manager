import "server-only";

import { Client, Account, Storage, Users, Databases } from "node-appwrite";

export async function createAdminClient() {
	const client = new Client()
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		.setKey(process.env.NEXT_APPWRITE_KEY!);

	return {
		get account() {
			return new Account(client);
		},
	};
}
