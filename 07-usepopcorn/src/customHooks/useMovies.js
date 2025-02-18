import { OMDB_BASE_URL, OMDB_KEY } from "../config.js";
import { useEffect, useState } from "react";

export function useMovies (query) {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	async function fetchMovies (query, signal) {
		setIsLoading(true);
		setError("");
		const res = await fetch(`${OMDB_BASE_URL}/?apikey=${OMDB_KEY}&s=${query}`, { signal });
		if (res.ok) {
			const data = await res.json();
			if (data.Response === "True") setMovies(data.Search);
			else setError("Movie not found");
		} else setError("Something went wrong with fetching movies");
		setIsLoading(false);
	}

	useEffect(() => {
		if (query.length < 3) {
			setMovies([]);
			setError("");
			return;
		}
		const controller = new AbortController();
		fetchMovies(query, controller.signal).catch(() => null);
		return () => controller.abort();
	}, [query]);

	return { movies, isLoading, error };
}