import Movie from "./Movie.jsx";
import PropTypes from "prop-types";

MovieList.propTypes = {
	movies: PropTypes.array.isRequired,
	onSelectMovie: PropTypes.func.isRequired,
};

export default function MovieList ({ movies, onSelectMovie }) {
	return <ul className="list list-movies">
		{movies?.map((movie) => <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie}/>)}
	</ul>;
}