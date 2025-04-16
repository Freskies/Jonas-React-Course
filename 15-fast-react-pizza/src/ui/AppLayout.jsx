import Header from "./Header.jsx";
import CartOverview from "../features/cart/CartOverview.jsx";
import { Outlet } from "react-router-dom";

function AppLayout () {
	return <div className={`grid grid-rows-[auto_1fr_auto] h-dvh font-pizza`}>
		<Header/>
		<main className={`overflow-auto`}>
			<Outlet/>
		</main>
		<CartOverview/>
	</div>;
}

export default AppLayout;