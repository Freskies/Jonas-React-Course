import { createContext, useCallback, useContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { BASE_URL } from "../config.js";

const CitiesContext = createContext(null);

CitiesProvider.propTypes = {
	children: PropTypes.node,
};

const initialState = {
	cities: [],
	isLoading: false,
	currentCity: null,
	error: "",
};

function reducer (state, { type, payload }) {
	switch (type) {
		case "loading":
			return { ...state, isLoading: true };
		case "cities/loaded":
			return { ...state, isLoading: false, cities: payload };
		case "city/loaded":
			return { ...state, isLoading: false, currentCity: payload };
		case "city/created":
			return { ...state, isLoading: false, cities: [...state.cities, payload], currentCity: payload };
		case "city/deleted":
			return {
				...state,
				isLoading: false,
				cities: state.cities.filter(city => city.id !== payload),
				currentCity: null,
			};
		case "rejected":
			return { ...state, isLoading: false, error: payload };
		default:
			throw new Error("Unknown action type");
	}
}

function CitiesProvider ({ children }) {
	const [{
		cities,
		isLoading,
		currentCity,
		error,
	}, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		async function fetchCities (signal) {
			try {
				dispatch({ type: "loading" });
				const res = await fetch(`${BASE_URL}/cities`, { signal });
				const data = await res.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch {
				dispatch({ type: "rejected", payload: "There was an error loading cities..." });
			}
		}

		const controller = new AbortController();
		fetchCities().then(() => null);
		return () => controller.abort();
	}, []);

	const getCity = useCallback(async (id) => {
		if (Number(id) === currentCity?.id) return;
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await res.json();
			dispatch({ type: "city/loaded", payload: data });
		} catch {
			dispatch({ type: "rejected", payload: "There was an error loading the city..." });
		}
	}, [currentCity?.id]);

	async function createCity (city) {
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${BASE_URL}/cities`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(city),
			});
			const data = await res.json();
			dispatch({ type: "city/created", payload: data });
		} catch {
			dispatch({ type: "rejected", payload: "There was an error creating the city..." });
		}
	}

	async function deleteCity (id) {
		dispatch({ type: "loading" });
		try {
			await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
			dispatch({ type: "city/deleted", payload: id });
		} catch {
			dispatch({ type: "rejected", payload: "There was an error deleting the city..." });
		}
	}

	return <CitiesContext.Provider value={{
		cities,
		isLoading,
		currentCity,
		error,
		getCity,
		createCity,
		deleteCity,
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