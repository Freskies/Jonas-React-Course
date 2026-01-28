import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins.js";
import toast from "react-hot-toast";

export default function useDeleteCabin () {
	const queryClient = useQueryClient();
	const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] })
				.then(() => toast.success("Cabin successfully deleted"));
		},
		onError: error => toast.error(error.message),
	});

	return { isDeleting, deleteCabin };
}