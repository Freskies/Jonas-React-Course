import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings.js";

export default function useUpdateSetting () {
	const queryClient = useQueryClient();
	const { isPending: isUpdating, mutate: updateSetting } = useMutation({
		mutationFn: newSetting => updateSettingApi(newSetting),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["settings"] })
				.then(() => toast.success("Settings successfully edited"));
		},
		onError: error => toast.error(error.message),
	});

	return { isUpdating, updateSetting };
}