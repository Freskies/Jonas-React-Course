import { getOrder } from "../../services/apiRestaurant.js";

async function loader ({ params }) {
	return await getOrder(params.orderId);
}

export default loader;