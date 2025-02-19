import PropTypes from "prop-types";

StartScreen.propTypes = {
	numQuestions: PropTypes.number.isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default function StartScreen ({ numQuestions, dispatch }) {

	function handleStart () {
		dispatch({ type: "start" });
	}

	return <div className="start">
		<h2>Welcome to The React Quiz!</h2>
		<h3>{numQuestions} questions to test your React mastery</h3>
		<button className="btn btn-ui" onClick={handleStart}>Let&apos;s start</button>
	</div>;
};