import { useEffect, useState } from "react";
import NavBar from "./components/NavBar.jsx";
import Main from "./components/Main.jsx";
import Search from "./components/Search.jsx";
import NumResults from "./components/NumResults.jsx";
import Logo from "./components/Logo.jsx";
import Box from "./components/Box.jsx";
import MovieList from "./components/MovieList.jsx";
import WatchedSummary from "./components/WatchedSummary.jsx";
import WatchedList from "./components/WatchedList.jsx";
import PropTypes from "prop-types";
import MovieDetails from "./components/MovieDetails.jsx";
import Loader from "./components/Loader.jsx";
import { OMDB_BASE_URL, OMDB_KEY } from "./config.js";

ErrorMessage.propTypes = {
	message: PropTypes.string.isRequired,
};

function ErrorMessage ({ message }) {
	return <p className="error">{message}</p>;
}

export default function App () {
	// movies
	const [movies, setMovies] = useState([]);
	const [watched, setWatched] = useState([]);
	// search
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	// selected
	const [selectedId, setSelectedId] = useState(null);

	function handleSelectMovie (id) {
		if (id === selectedId) setSelectedId(null);
		else setSelectedId(id);
	}

	function handleCloseMovie () {
		setSelectedId(null);
	}

	function handleAddWatched (movie) {
		setWatched(watched => [...watched, movie]);
	}

	function isInWatchedList (id) {
		return watched.some(({ imdbID }) => imdbID === id);
	}

	function getRatingOfWatchedMovie (id) {
		return watched.find(({ imdbID }) => imdbID === id)?.userRating;
	}

	function handleDeleteWatchedMovie (id) {
		setWatched(watched => watched.filter(({ imdbID }) => imdbID !== id));
	}

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

	return <>
		<NavBar>
			<Logo/>
			<Search query={query} setQuery={setQuery}/>
			<NumResults movieLength={movies.length}/>
		</NavBar>
		<Main>
			<Box>
				{isLoading && <Loader/>}
				{!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie}/>}
				{error && <ErrorMessage message={error}/>}
			</Box>
			<Box>
				{selectedId
					? <MovieDetails
						selectedId={selectedId}
						onCloseMovie={handleCloseMovie}
						onAddWatched={handleAddWatched}
						isInWatchedList={isInWatchedList}
						getRatingOfWatchedMovie={getRatingOfWatchedMovie}
					/>
					: <>
						<WatchedSummary watched={watched}/>
						<WatchedList watched={watched} onDeleteWatchedMovie={handleDeleteWatchedMovie}/>
					</>}
			</Box>
		</Main>
	</>;
}
