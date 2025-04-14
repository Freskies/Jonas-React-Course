import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home.jsx";
import Menu from "./features/menu/Menu.jsx";
import Cart from "./features/cart/Cart.jsx";
import CreateOrder from "./features/order/CreateOrder.jsx";
import Order from "./features/order/Order.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import menuLoader from "./features/menu/menuLoader.js";
import Spinner from "./ui/Spinner.jsx";
import Error from "./ui/Error.jsx";
import orderLoader from "./features/order/orderLoader.js";
import createOrderAction from "./features/order/createOrderAction.js";

const router = createBrowserRouter([
	{
		element: <AppLayout/>,
		errorElement: <Error/>,
		children: [
			{
				path: "/",
				element: <Home/>,
			},
			{
				path: "/menu",
				element: <Menu/>,
				loader: menuLoader,
				hydrateFallbackElement: <Spinner/>,
				errorElement: <Error/>,
			},
			{
				path: "/cart",
				element: <Cart/>,
			},
			{
				path: "/order/new",
				element: <CreateOrder/>,
				action: createOrderAction,
			},
			{
				path: "/order/:orderId",
				element: <Order/>,
				loader: orderLoader,
				hydrateFallbackElement: <Spinner/>,
				errorElement: <Error/>,
			},
		],
	},
]);

function App () {
	return <RouterProvider router={router}/>;
}

export default App;