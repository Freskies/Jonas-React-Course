import WatchedMovie from "./WatchedMovie.jsx";
import PropTypes from "prop-types";

WatchedList.propTypes = {
	watched: PropTypes.array.isRequired,
};

export default function WatchedList ({ watched }) {
	return <ul className="list">
		{watched.map((movie) => <WatchedMovie movie={movie} key={movie.imdbID}/>)}
	</ul>;
}