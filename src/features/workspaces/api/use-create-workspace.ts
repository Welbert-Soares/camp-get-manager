import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspace = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({ json }) => {
			// biome-ignore lint/complexity/useLiteralKeys: <explanation>
			const response = await client.api.workspaces["$post"]({ json });
			return await response.json();
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["workspaces"] });
		},
	});

	return mutation;
};
