import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem.jsx";

function Menu () {
	const menu = useLoaderData();

	return <ul>
		{menu.map(pizza => <MenuItem pizza={pizza} key={pizza.id}/>)}
	</ul>;
}

export default Menu;
