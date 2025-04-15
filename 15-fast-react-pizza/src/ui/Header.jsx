import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import Username from "../features/user/Username.jsx";

function Header () {
	return <header className={`flex items-center justify-around bg-yellow-400 px-4 py-3 border-b
	border-stone-200 uppercase sm:px-6 font-pizza`}>
		<Link to="/" className={`tracking-[.25em]`}>Fast React Pizza Co.</Link>
		<SearchOrder/>
		<Username/>
	</header>;
}

export default Header;