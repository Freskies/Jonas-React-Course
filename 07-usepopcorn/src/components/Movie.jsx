import PropTypes from "prop-types";

Movie.propTypes = {
	movie: PropTypes.shape({
		Poster: PropTypes.string.isRequired,
		Title: PropTypes.string.isRequired,
		Year: PropTypes.string.isRequired,
		imdbID: PropTypes.string.isRequired,
	}).isRequired,
	onSelectMovie: PropTypes.func.isRequired,
};

export default function Movie ({ movie: { Poster, Title, Year, imdbID }, onSelectMovie }) {
	return <li onClick={() => onSelectMovie(imdbID)}>
		<img src={Poster} alt={`${Title} poster`}/>
		<h3>{Title}</h3>
		<div>
			<p>
				<span>🗓</span>
				<span>{Year}</span>
			</p>
		</div>
	</li>;
}