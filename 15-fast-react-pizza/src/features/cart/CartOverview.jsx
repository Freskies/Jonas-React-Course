import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNumberOfPizzas, getTotalCartPrice } from "./cartSlice.js";
import { formatCurrency } from "../../utils/helpers.js";

function CartOverview () {
	const numOfPizzas = useSelector(getNumberOfPizzas);
	const totalPrice = useSelector(getTotalCartPrice);

	if (!numOfPizzas) return null;

	return <div className={`bg-stone-800 p-4 text-stone-200 uppercase flex items-center justify-between sm:px-6`}>
		<p className={`space-x-4 text-stone-200 text-sm font-semibold sm:space-x-6 md:text-base`}>
			<span>{numOfPizzas} pizzas</span>
			<span>{formatCurrency(totalPrice)}</span>
		</p>
		<Link to="/cart">Open cart &rarr;</Link>
	</div>;
}

export default CartOverview;
