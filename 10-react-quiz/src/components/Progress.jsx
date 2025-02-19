import PropTypes from "prop-types";

Progress.propTypes = {
	index: PropTypes.number.isRequired,
	numQuestions: PropTypes.number.isRequired,
	points: PropTypes.number.isRequired,
	maxPossiblePoints: PropTypes.number.isRequired,
	isAnswered: PropTypes.bool.isRequired,
};

export default function Progress ({ index, numQuestions, points, maxPossiblePoints, isAnswered }) {
	return <header className="progress">
		<progress max={numQuestions} value={index + isAnswered}></progress>
		<p>Question <strong>{index + 1}</strong> / {numQuestions}</p>
		<p><strong>{points}</strong> / {maxPossiblePoints}</p>
	</header>;
};