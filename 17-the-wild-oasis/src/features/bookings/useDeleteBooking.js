import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingAPI } from "../../services/apiBookings.js";
import toast from "react-hot-toast";

export function useDeleteBooking () {
	const queryClient = useQueryClient();

	const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
		mutationFn: (bookingId) => deleteBookingAPI(bookingId),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["bookings"] })
			.then(() => toast.success(`Booking deleted successfully!`)),
		onError: () => toast.error(`There was an error deleting the booking`),
	});

	return { isDeleting, deleteBooking };
}