import Movie from "./Movie.jsx";
import PropTypes from "prop-types";

MovieList.propTypes = {
	movies: PropTypes.array.isRequired,
};

export default function MovieList ({ movies }) {
	return <ul className="list">
		{movies?.map((movie) => <Movie movie={movie} key={movie.imdbID} />)}
	</ul>;
}