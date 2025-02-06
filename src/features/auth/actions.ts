"use server";

import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";
import { AUTH_COOKIE } from "./constants";

export const getCurrent = async () => {
	try {
		const client = new Client()
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
			// biome-ignore lint/style/noNonNullAssertion: <explanation>
			.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

		const session = await cookies().get(AUTH_COOKIE);

		if (!session) {
			return null;
		}

		client.setSession(session.value);
		const account = new Account(client);

		return await account.get();
	} catch {
		return null;
	}
};
