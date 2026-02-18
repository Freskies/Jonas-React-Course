import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useCheckin () {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: checkIn, isPending: isCheckingIn } = useMutation({
		mutationFn: ({ bookingId, breakfast }) => updateBooking(bookingId, {
			status: "checked-in",
			isPaid: true,
			...breakfast,
		}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} checked in successfully!`);
			queryClient.invalidateQueries({ queryKey: ["bookings"] }).then(() => null);
			navigate("/");
		},
		onError: () => toast.error(`There was an error while checking in`),
	});

	return { checkIn, isCheckingIn };
}