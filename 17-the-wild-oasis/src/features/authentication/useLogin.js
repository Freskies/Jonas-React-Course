import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { login as loginAPI } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useLogin () {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: login, isPending: ilLoggingIn } = useMutation({
		mutationFn: ({ email, password }) => loginAPI({ email, password }),
		onSuccess: (user) => {
			queryClient.setQueryData(["user"], user.user);
			navigate("/dashboard", { replace: true });
		},
		onError: () => toast.error("provided email or password are incorrect"),
	});

	return { login, ilLoggingIn };
}