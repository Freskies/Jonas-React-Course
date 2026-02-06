import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";

function CabinTableOperations () {
	return <TableOperations>
		<Filter filterField={"discount"} options={[
			["All", "all"],
			["No discount", "no-discount"],
			["With discount", "with-discount"],
		]}/>
		<SortBy options={[
			["Sort by name (A-Z)", "name-asc"],
			["Sort by name (Z-A)", "name-desc"],
			["Sort by price (low-high)", "price-asc"],
			["Sort by price (high-low)", "price-desc"],
			["Sort by capacity (low first)", "capacity-asc"],
			["Sort by capacity (high first)", "capacity-desc"]
		]}/>
	</TableOperations>;
}

export default CabinTableOperations;