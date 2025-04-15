import { Link } from "react-router-dom";

function CartOverview () {
	return <div className={`bg-stone-800 p-4 text-stone-200 uppercase flex items-center justify-between sm:px-6`}>
		<p className={`space-x-4 text-stone-200 text-sm font-semibold sm:space-x-6 md:text-base`}>
			<span>23 pizzas</span>
			<span>$23.45</span>
		</p>
		<Link to="/cart">Open cart &rarr;</Link>
	</div>;
}

export default CartOverview;
