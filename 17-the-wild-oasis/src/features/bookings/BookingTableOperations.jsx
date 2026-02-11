import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter.jsx";
import TableOperations from "../../ui/TableOperations.jsx";

function BookingTableOperations () {
	return <TableOperations>
		<Filter
			filterField="status"
			options={[
				["All", "all"],
				["Checked out", "checked-out"],
				["Checked in", "checked-in"],
				["Unconfirmed", "unconfirmed"],
			]}
		/>

		<SortBy
			options={[
				["Sort by date (recent first)", "date-desc"],
				["Sort by date (earlier first)", "date-asc"],
				["Sort by amount (high first)", "amount-desc"],
				["Sort by amount (low first)", "amount-asc"],
			]}
		/>
	</TableOperations>;
}

export default BookingTableOperations;
