import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import CityList from "./components/CityList.jsx";
import City from "./components/City.jsx";
import CountryList from "./components/CountryList.jsx";
import Form from "./components/Form.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.jsx"));

export default function App () {
	return <AuthProvider>
		<CitiesProvider>
			<BrowserRouter>
				<Suspense fallback={<SpinnerFullPage/>}>
					<Routes>
						<Route index element={<Home/>}/>
						<Route path="product" element={<Product/>}/>
						<Route path="pricing" element={<Pricing/>}/>
						<Route path="login" element={<Login/>}/>
						<Route path="app" element={<ProtectedRoute><AppLayout/></ProtectedRoute>}>
							<Route index element={<Navigate to="cities" replace/>}/>
							<Route path="cities" element={<CityList/>}/>
							<Route path="cities/:id" element={<City/>}/>
							<Route path="countries" element={<CountryList/>}/>
							<Route path="form" element={<Form/>}/>
						</Route>
						<Route path="*" element={<PageNotFound/>}></Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</CitiesProvider>
	</AuthProvider>;
};