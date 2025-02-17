import PropTypes from "prop-types";

Search.propTypes = {
	query: PropTypes.string.isRequired,
	onSetQuery: PropTypes.func.isRequired,
};

export default function Search ({ query, onSetQuery }) {
	return <input
		className="search"
		type="text"
		placeholder="Search movies..."
		value={query}
		onChange={e => onSetQuery(e.target.value)}
	/>;
}