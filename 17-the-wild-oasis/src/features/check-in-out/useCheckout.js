import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings.js";

export function useCheckout () {
	const queryClient = useQueryClient();

	const { mutate: checkOut, isPending: isCheckingOut } = useMutation({
		mutationFn: (bookingId) => updateBooking(bookingId, { status: "checked-out" }),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} checked out successfully!`);
			queryClient.invalidateQueries().then(() => null);
		},
		onError: () => toast.error(`There was an error checking out the booking`),
	});

	return { checkOut, isCheckingOut };
}