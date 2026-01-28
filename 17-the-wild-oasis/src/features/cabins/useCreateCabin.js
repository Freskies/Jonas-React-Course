import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export default function useCreateCabin () {
	const queryClient = useQueryClient();
	const { isPending: isCreating, mutate: createCabin } = useMutation({
		mutationFn: (newCabin) => createEditCabin(newCabin),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] })
				.then(() => toast.success("New cabin successfully created"));
		},
		onError: error => toast.error(error.message),
	});

	return { isCreating, createCabin };
}