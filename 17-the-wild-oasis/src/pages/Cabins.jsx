import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useEffect } from "react";
import { getCabins } from "../services/apiCabins.js";

function Cabins () {
	useEffect(() => {
		getCabins().then(cabins => console.log(cabins))
	}, []);

	return <Row type="horizontal">
		<Heading>All cabins</Heading>
		<img src="https://ldllxejdkhqyioxemtfi.supabase.co/storage/v1/object/public/cabin.images/cabin-001.jpg" alt=""/>
		<p>TEST</p>
	</Row>;
}

export default Cabins;
