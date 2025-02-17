import PropTypes from "prop-types";

WatchedMovie.propTypes = {
	movie: PropTypes.shape({
		imdbID: PropTypes.string.isRequired,
		poster: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		year: PropTypes.string.isRequired,
		imdbRating: PropTypes.number.isRequired,
		userRating: PropTypes.number.isRequired,
		runtime: PropTypes.number.isRequired,
	}).isRequired,
	onDeleteWatchedMovie: PropTypes.func.isRequired,
};

export default function WatchedMovie ({
	movie: { imdbID, poster, title, year, imdbRating, userRating, runtime },
	onDeleteWatchedMovie,
}) {
	return <li>
		<img src={poster} alt={`${title} poster`}/>
		<h3>{title}</h3>
		<div>
			<p>
				<span>⭐️</span>
				<span>{imdbRating}</span>
			</p>
			<p>
				<span>🌟</span>
				<span>{userRating}</span>
			</p>
			<p>
				<span>⏳</span>
				<span>{runtime} min</span>
			</p>
			<div className="btn-delete" onClick={() => onDeleteWatchedMovie(imdbID)}>X</div>
		</div>
	</li>;
}