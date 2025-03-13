import { createContext, useContext, useState } from "react";
import { useFetchCities } from "../hooks/useFetchCities.js";
import PropTypes from "prop-types";
import { BASE_URL } from "../config.js";

const CitiesContext = createContext(undefined);

CitiesProvider.propTypes = {
	children: PropTypes.node,
};

function CitiesProvider ({ children }) {
	const citiesFetch = useFetchCities();

	const [currentCity, setCurrentCity] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState("");

	const currentCityFetch = {
		currentCity,
		isLoading,
		error,
	};

	async function getCity (id) {
		try {
			setIsLoading(true);
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			setCurrentCity(data);
		} catch (e) {
			setError(e);
		} finally {
			setIsLoading(false);
		}
	}

	return <CitiesContext.Provider value={{
		citiesFetch,
		currentCityFetch,
		getCity,
	}}>
		{children}
	</CitiesContext.Provider>;
}

function useCities () {
	const context = useContext(CitiesContext);
	if (context === undefined) throw new Error("CitiesContext must be used within a CitiesProvider");
	return context;
}

export { CitiesProvider, useCities };