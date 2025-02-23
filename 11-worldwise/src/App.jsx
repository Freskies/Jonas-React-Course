import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product.jsx";
import Home from "./pages/Home.jsx";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";

export default function App () {
	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<Home/>}/>
			<Route path="product" element={<Product/>}/>
			<Route path="pricing" element={<Pricing/>}/>
			<Route path="*" element={<PageNotFound/>}></Route>
		</Routes>
	</BrowserRouter>;
};