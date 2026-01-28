import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export default function useEditCabin () {
	const queryClient = useQueryClient();
	const { isPending: isEditing, mutate: editCabin } = useMutation({
		mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] })
				.then(() => toast.success("Cabin successfully edited"));
		},
		onError: error => toast.error(error.message),
	});

	return { isEditing, editCabin };
}