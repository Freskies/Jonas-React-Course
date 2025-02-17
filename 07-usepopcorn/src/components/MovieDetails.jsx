import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { OMDB_BASE_URL, OMDB_KEY } from "../config.js";
import StarRating from "../StarRating/StarRating.jsx";
import Loader from "./Loader.jsx";

MovieDetails.propTypes = {
	selectedId: PropTypes.string.isRequired,
	onCloseMovie: PropTypes.func.isRequired,
	onAddWatched: PropTypes.func.isRequired,
	isInWatchedList: PropTypes.func.isRequired,
	getRatingOfWatchedMovie: PropTypes.func.isRequired,
};

const starSize = 24;

export default function MovieDetails ({
	selectedId,
	onCloseMovie,
	onAddWatched,
	isInWatchedList,
	getRatingOfWatchedMovie,
}) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	async function fetchMovieDetails (id, signal) {
		setIsLoading(true);
		const res = await fetch(`${OMDB_BASE_URL}?apikey=${OMDB_KEY}&i=${id}`, { signal });
		if (res.ok) {
			const data = await res.json();
			if (data.Response === "True") setMovie(data);
		}
		setIsLoading(false);
	}

	useEffect(() => {
		const controller = new AbortController();
		fetchMovieDetails(selectedId, controller.signal).catch(() => null);
		return () => controller.abort();
	}, [selectedId]);

	return <div className="details" key={`movieDetails-${selectedId}`}>
		{isLoading
			? <Loader/>
			: <Movie
				selectedId={selectedId}
				movie={movie}
				onCloseMovie={onCloseMovie}
				onAddWatched={onAddWatched}
				isInWatchedList={isInWatchedList}
				getRatingOfWatchedMovie={getRatingOfWatchedMovie}
			/>}
	</div>;
}

Movie.propTypes = {
	selectedId: PropTypes.string.isRequired,
	movie: PropTypes.shape({
		Title: PropTypes.string,
		Year: PropTypes.string,
		Poster: PropTypes.string,
		Runtime: PropTypes.string,
		imdbRating: PropTypes.string,
		Plot: PropTypes.string,
		Released: PropTypes.string,
		Actors: PropTypes.string,
		Director: PropTypes.string,
		Genre: PropTypes.string,
	}).isRequired,
	onCloseMovie: PropTypes.func.isRequired,
	onAddWatched: PropTypes.func.isRequired,
	isInWatchedList: PropTypes.func.isRequired,
	getRatingOfWatchedMovie: PropTypes.func.isRequired,
};

function Movie ({
	selectedId,
	movie: {
		Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot,
		Released: released, Actors: actors, Director: director, Genre: genre,
	},
	onCloseMovie,
	onAddWatched,
	isInWatchedList,
	getRatingOfWatchedMovie,
}) {
	const [userRating, setUserRating] = useState(0);

	function setTitleEffect () {
		if (!title) return;
		document.title = `Movie | ${title}`;
		return () => document.title = "usePopcorn";
	}

	function listenEscEffect () {
		function callback (e) {
			if (e.code === "Escape") onCloseMovie();
		}

		document.addEventListener("keydown", callback);
		return () => document.removeEventListener("keydown", callback);
	}

	useEffect(setTitleEffect, [title]);

	useEffect(listenEscEffect, [onCloseMovie]);

	function handleAdd () {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			userRating,
			runtime: Number(runtime.split(" ").at(0)),
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();
	}

	return <>
		<header>
			<button className="btn-back" onClick={onCloseMovie}>&larr;</button>
			<img src={poster} alt={`Poster of ${title}`}/>
			<div className="details-overview">
				<h2>{title}</h2>
				<p>{released} &bull; {runtime}</p>
				<p>{genre}</p>
				<p>
					<span>⭐</span>
					{imdbRating} IMDb rating
				</p>
			</div>
		</header>
		<section>
			<div className="rating">
				{isInWatchedList(selectedId)
					? <p>You rated this movie {getRatingOfWatchedMovie(selectedId)}⭐</p>
					: <StarRating maxRating={10} size={starSize} onSetRating={setUserRating}/>
				}
				{userRating > 0 && <div className="btn-add" onClick={handleAdd}>+ Add to list</div>}
			</div>

			<p><em>{plot}</em></p>
			<p>Starring {actors}</p>
			<p>Directed by {director}</p>
		</section>
	</>;
}