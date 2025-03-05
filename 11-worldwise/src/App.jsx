import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product.jsx";
import Home from "./pages/Home.jsx";
import Pricing from "./pages/Pricing.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import CityList from "./components/CityList.jsx";
import { useCities } from "./hooks/useCities.js";
import CountryList from "./components/CountryList.jsx";
import City from "./components/City.jsx";

export default function App () {
	const citiesFetch = useCities();

	return <BrowserRouter>
		<Routes>
			<Route index element={<Home/>}/>
			<Route path="product" element={<Product/>}/>
			<Route path="pricing" element={<Pricing/>}/>
			<Route path="login" element={<Login/>}/>
			<Route path="app" element={<AppLayout/>}>
				<Route index element={<Navigate to="cities" replace/>}/>
				<Route path="cities" element={<CityList citiesFetch={citiesFetch}/>}/>
				<Route path="cities/:id" element={<City/>}/>
				<Route path="countries" element={<CountryList citiesFetch={citiesFetch}/>}/>
				<Route path="form" element={<p>form</p>}/>
			</Route>
			<Route path="*" element={<PageNotFound/>}></Route>
		</Routes>
	</BrowserRouter>;
};