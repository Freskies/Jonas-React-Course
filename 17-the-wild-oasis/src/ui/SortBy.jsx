import Select from "./Select.jsx";
import { useSearchParams } from "react-router";

function SortBy ({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const selectedSortBy = searchParams.get("sortBy") || "";

	function handleChange (e) {
		searchParams.set("sortBy", e.target.value);
		setSearchParams(searchParams);
	}

	return <Select value={selectedSortBy} options={options} $type={"white"} onChange={handleChange}/>;
}

export default SortBy;