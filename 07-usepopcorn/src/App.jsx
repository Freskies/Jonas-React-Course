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

const OMDB_KEY = "33d4be54";
const OMDB_BASE_URL = "https://www.omdbapi.com";

function Loader () {
	return <p className="loader">LOADING...</p>;
}

ErrorMessage.propTypes = {
	message: PropTypes.string.isRequired,
};

function ErrorMessage ({ message }) {
	return <p className="error">{message}</p>;
}

export default function App () {
	const [movies, setMovies] = useState([]);
	const [watched] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const query = "interstellar";

	async function fetchMovies (query) {
		setIsLoading(true);
		const res = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_KEY}&s=${query}`);
		if (res.ok) {
			const data = await res.json();
			if (data.Response === "True") setMovies(data.Search);
			else setError("Movie not found");
		} else setError("Something went wrong with fetching movies");
		setIsLoading(false);
	}

	useEffect(() => {
		fetchMovies(query);
	}, [query]);

	return <>
		<NavBar>
			<Logo/>
			<Search/>
			<NumResults movieLength={movies.length}/>
		</NavBar>
		<Main>
			<Box>
				{isLoading && <Loader/>}
				{isLoading && !error && <MovieList movies={movies}/>}
				{error && <ErrorMessage message={error}/>}
			</Box>
			<Box>
				<WatchedSummary watched={watched}/>
				<WatchedList watched={watched}/>
			</Box>
		</Main>
	</>;
}
