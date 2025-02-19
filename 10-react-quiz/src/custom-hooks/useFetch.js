import { useEffect, useState } from "react";
import Error from "../components/Error.jsx";

export function useFetch (query, dataName = "data") {
	const [data, setData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	async function fetchData (query, signal) {
		setIsLoading(true);
		setError(null);
		const res = await fetch(query, { signal });
		if (res.ok) {
			const fetchedData = await res.json();
			if (fetchedData) setData(fetchedData);
			else setError(new Error(`No ${dataName} found`));
		} else setError(new Error(`An error occurred while fetching ${dataName}`));
		setIsLoading(false);
	}

	function catchError (error) {
		if (error.name !== "AbortError") setError(error);
		setIsLoading(false);
	}

	useEffect(() => {
		const controller = new AbortController();
		fetchData(query, controller.signal).catch(catchError);
		return () => controller.abort();
	}, [query]);

	return { data, isLoading, error };
}