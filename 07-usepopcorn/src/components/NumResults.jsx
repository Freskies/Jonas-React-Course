import PropTypes from "prop-types";

NumResults.propTypes = {
	movieLength: PropTypes.number.isRequired,
};

export default function NumResults ({ movieLength }) {
	return <p className="num-results">
		Found <strong>{movieLength}</strong> results
	</p>;
}