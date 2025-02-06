import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.workspaces)["$post"]>;
type RequestType = InferRequestType<(typeof client.api.workspaces)["$post"]>;

export const useCreateWorkspace = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({ form }) => {
			// biome-ignore lint/complexity/useLiteralKeys: <explanation>
			const response = await client.api.workspaces["$post"]({ form });

			if (!response.ok) {
				throw new Error(
					"Erro ao criar acampamento, tente novamente mais tarde.",
				);
			}

			return await response.json();
		},
		onSuccess: () => {
			toast.success("Acampamento criado com sucesso!");
			queryClient.invalidateQueries({ queryKey: ["workspaces"] });
		},
		onError: () => {
			toast.error("Erro ao criar acampamento, tente novamente mais tarde.");
		},
	});

	return mutation;
};
