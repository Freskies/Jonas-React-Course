import PropTypes from "prop-types";

WatchedMovie.propTypes = {
	movie: PropTypes.shape({
		Poster: PropTypes.string.isRequired,
		Title: PropTypes.string.isRequired,
		imdbRating: PropTypes.string.isRequired,
		userRating: PropTypes.string.isRequired,
		runtime: PropTypes.string.isRequired,
	}).isRequired,
};

export default function WatchedMovie ({ movie: { Poster, Title, imdbRating, userRating, runtime } }) {
	return <li>
		<img src={Poster} alt={`${Title} poster`}/>
		<h3>{Title}</h3>
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
		</div>
	</li>;
}