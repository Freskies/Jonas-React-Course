import Spinner from "../../ui/Spinner.jsx";
import CabinRow from "./CabinRow.jsx";
import useCabins from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import { useSearchParams } from "react-router";
import Empty from "../../ui/Empty.jsx";

function CabinTable () {
	const { isPending, cabins } = useCabins();
	const [searchParams] = useSearchParams();

	if (isPending) return <Spinner/>;
	if (!cabins?.length) return <Empty resource={"Cabins"}/>;

	const filterValue = searchParams.get("discount") || "all";
	const sortBy = searchParams.get("sortBy") || "name-asc";

	const filteredCabins = filterCabins(cabins, filterValue);
	const sortedCabins = sortCabins(filteredCabins, sortBy);

	return <Menus>
		<Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
			<Table.Header role={"row"}>
				<div></div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div></div>
			</Table.Header>
			<Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id}/>}/>
		</Table>
	</Menus>;
}

function filterCabins (cabins, filterValue) {
	return cabins.filter((cabin) => {
		switch (filterValue) {
			case "all":
				return true;
			case "no-discount":
				return cabin.discount === 0;
			case "with-discount":
				return cabin.discount > 0;
			default:
				return false;
		}
	});
}

function sortCabins (cabins, sortBy) {
	return cabins.sort((a, b) => {
		switch (sortBy) {
			case "name-asc":
				return a.name.localeCompare(b.name);
			case "name-desc":
				return b.name.localeCompare(a.name);
			case "price-asc":
				return a.regularPrice - b.regularPrice;
			case "price-desc":
				return b.regularPrice - a.regularPrice;
			case "capacity-asc":
				return a.maxCapacity - b.maxCapacity;
			case "capacity-desc":
				return b.maxCapacity - a.maxCapacity;
			default:
				return 0;
		}
	});
}


export default CabinTable;
