import PropTypes from "prop-types";

NextButton.propTypes = {
	isAnswered: PropTypes.bool.isRequired,
	dispatch: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

export default function NextButton ({ isAnswered, dispatch, children }) {

	function handleNext () {
		dispatch({ type: "nextQuestion" });
	}

	if (!isAnswered) return null;

	return <button className="btn btn-ui" onClick={handleNext}>
		{children}
	</button>;
};