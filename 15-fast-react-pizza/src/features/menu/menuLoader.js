import { getMenu } from "../../services/apiRestaurant.js";

async function loader () {
	return await getMenu();
}

export default loader;