import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router";

export default function useBookings () {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	const filterValue = searchParams.get("status");
	const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };
	const [sortValue, sortDirection] = (searchParams.get("sortBy") || "date-asc").split("-");
	const sortBy = { field: getFieldFromValue(sortValue), direction: sortDirection };
	const page = +searchParams.get("page") || 1;

	const { isPending, data: { data: bookings, count } = {}, error } = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	queryClient.prefetchQuery({
		queryKey: ["bookings", filter, sortBy, page - 1],
		queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
		retry: false,
	}).catch(() => null);

	queryClient.prefetchQuery({
		queryKey: ["bookings", filter, sortBy, page + 1],
		queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
		retry: false,
	}).catch(() => null);

	return { isPending, bookings, count, error };
}

function getFieldFromValue (sortValue) {
	switch (sortValue) {
		case "date":
			return "startDate";
		case "amount":
			return "totalPrice";
		default:
			return "startDate";
	}
}