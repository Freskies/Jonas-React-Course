import { useEffect, useState } from "react";
import { BASE_URL } from "../config.js";

export function useCities () {
	const [cities, setCities] = useState([]);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		async function fetchCities (signal) {
			const res = await fetch(`${BASE_URL}/cities`, { signal });
			const data = await res.json();
			setCities(data);
		}

		const controller = new AbortController();
		setIsLoading(true);
		fetchCities()
			.catch(err => {
				if (err.name === "AbortError") return;
				setError(err.message);
			})
			.finally(() => setIsLoading(false));
		return () => controller.abort();
	}, []);

	return { cities, isLoading, error };
}