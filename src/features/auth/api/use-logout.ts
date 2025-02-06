import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { InferResponseType } from "hono";

import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<(typeof client.api.auth.logout)["$post"]>;

export const useLogout = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error>({
		mutationFn: async () => {
			// biome-ignore lint/complexity/useLiteralKeys: <explanation>
			const response = await client.api.auth.logout["$post"]();

			if (!response.ok) {
				throw new Error("Erro ao encerrar sessão, tente novamente.");
			}

			return await response.json();
		},
		onSuccess: () => {
			toast.success("Sessão encerrada!");
			router.refresh();
			queryClient.invalidateQueries({ queryKey: ["current"] });
			queryClient.invalidateQueries({ queryKey: ["workspaces"] });
		},
		onError: () => {
			toast.error("Erro ao encerrar sessão, tente novamente.");
		},
	});

	return mutation;
};
