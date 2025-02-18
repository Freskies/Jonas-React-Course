import { useState } from "react";
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
import { useMovies } from "./customHooks/useMovies.js";
import { useLocalStorage } from "./customHooks/useLocalStorage.js";

ErrorMessage.propTypes = {
	message: PropTypes.string.isRequired,
};

function ErrorMessage ({ message }) {
	return <p className="error">{message}</p>;
}

export default function App () {
	const [query, setQuery] = useState("");
	const { movies, isLoading, error } = useMovies(query);
	const [watched, setWatched] = useLocalStorage("watched");
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

	return <>
		<NavBar>
			<Logo/>
			<Search query={query} onSetQuery={setQuery}/>
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
