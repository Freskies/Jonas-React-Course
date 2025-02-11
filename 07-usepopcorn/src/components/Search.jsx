import PropTypes from "prop-types";

Search.propTypes = {
	query: PropTypes.string.isRequired,
	setQuery: PropTypes.func.isRequired,
};

export default function Search ({ query, setQuery }) {
	return <input
		className="search"
		type="text"
		placeholder="Search movies..."
		value={query}
		onChange={e => setQuery(e.target.value)}
	/>;
}