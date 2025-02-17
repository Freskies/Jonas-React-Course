import WatchedMovie from "./WatchedMovie.jsx";
import PropTypes from "prop-types";

WatchedList.propTypes = {
	watched: PropTypes.array.isRequired,
	onDeleteWatchedMovie: PropTypes.func.isRequired,
};

export default function WatchedList ({ watched, onDeleteWatchedMovie }) {
	return <ul className="list">
		{watched.map((movie) =>
			<WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatchedMovie={onDeleteWatchedMovie}/>)
		}
	</ul>;
}