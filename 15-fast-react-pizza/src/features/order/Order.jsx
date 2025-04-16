// Test ID: IIDSAT CQE92U

import {
	calcMinutesLeft,
	formatCurrency,
	formatDate,
} from "../../utils/helpers";
import { useLoaderData } from "react-router-dom";
import Cart from "../cart/Cart.jsx";
import OrderItem from "./OrderItem.jsx";

function Order () {
	const order = useLoaderData();
	const {
		id,
		status,
		priority,
		priorityPrice,
		orderPrice,
		estimatedDelivery,
		cart,
	} = order;
	const deliveryIn = calcMinutesLeft(estimatedDelivery);

	return <div className={`px-4 py-6 space-y-8`}>
		<div className={`flex items-center justify-between flex-wrap`}>
			<h2 className={`text-xl font-semibold`}>Order #{id} status</h2>

			<div className={`flex gap-2 flex-wrap`}>
				{priority && <span className={`bg-red-500 rounded-full py-1 px-3 text-sm font-semibold
				text-red-50 uppercase`}>
					Priority
				</span>}
				<span className={`bg-green-500 rounded-full py-1 px-3 text-sm font-semibold
				text-green-50 uppercase text-nowrap`}>
					{status} order
				</span>
			</div>
		</div>

		<div className={`flex flex-wrap items-center justify-between gap-2 bg-stone-200 py-5 px-6 rounded-md`}>
			<p className={`font-medium`}>
				{deliveryIn >= 0
					? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
					: "Order should have arrived"}
			</p>
			<p className={`text-xs text-stone-500`}>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
		</div>

		<ul className={`divide-y divide-stone-200 border-y border-stone-200`}>
			{cart.map(item => <OrderItem item={item} key={item.pizzaId}/>)}
		</ul>

		<div className={`space-y-2 bg-stone-200 py-5 px-6 rounded-md`}>
			<p className={`text-sm font-medium text-stone-600`}>
				Price pizza: {formatCurrency(orderPrice)}
			</p>
			{priority && <p className={`text-sm font-medium text-stone-600`}>
				Price priority: {formatCurrency(priorityPrice)}
			</p>}
			<p className={`text-sm font-bold text-stone-600`}>
				To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
			</p>
		</div>
	</div>;
}

export default Order;
