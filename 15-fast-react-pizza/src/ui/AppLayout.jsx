import Header from "./Header.jsx";
import CartOverview from "../features/cart/CartOverview.jsx";
import { Outlet } from "react-router-dom";

function AppLayout () {
	return <div className="layout">
		<Header/>
		<main>
			<Outlet/>
		</main>
		<CartOverview/>
	</div>;
}

export default AppLayout;