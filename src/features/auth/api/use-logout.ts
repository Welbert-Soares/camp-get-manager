import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<
		ResponseType, 
		Error
	>({
		mutationFn: async () => {
			// biome-ignore lint/complexity/useLiteralKeys: <explanation>
			const response = await client.api.auth.logout["$post"]();
			return await response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["current"] });
		}
	});

	return mutation;
};
