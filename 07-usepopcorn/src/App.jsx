import { useState } from "react";
import NavBar from "./components/NavBar.jsx";
import Main from "./components/Main.jsx";
import { tempMovieData, tempWatchedData } from "./fooData.js";
import Search from "./components/Search.jsx";
import NumResults from "./components/NumResults.jsx";
import Logo from "./components/Logo.jsx";
import Box from "./components/Box.jsx";
import MovieList from "./components/MovieList.jsx";
import WatchedSummary from "./components/WatchedSummary.jsx";
import WatchedList from "./components/WatchedList.jsx";

export default function App () {
	const [movies] = useState(tempMovieData);
	const [watched] = useState(tempWatchedData);

	return <>
		<NavBar>
			<Logo />
			<Search />
			<NumResults movieLength={movies.length} />
		</NavBar>
		<Main>
			<Box>
				<MovieList movies={movies} />
			</Box>
			<Box>
				<WatchedSummary watched={watched}/>
				<WatchedList watched={watched}/>
			</Box>
		</Main>
	</>;
}
