import PropTypes from "prop-types";

FinishScreen.propTypes = {
	points: PropTypes.number.isRequired,
	maxPossiblePoints: PropTypes.number.isRequired,
	highScore: PropTypes.number.isRequired,
};

const MAX = 100;
const VERY_GOOD = 80;
const GOOD = 50;
const WORSE = 0;

function getEmojiFromPercentage (percentage) {
	switch (true) {
		case percentage === MAX:
			return "🥇";
		case percentage >= VERY_GOOD:
			return "🎉";
		case percentage >= GOOD:
			return "🙂";
		case percentage === WORSE:
			return "🤦";
		default:
			return "🥲";
	}
}

export default function FinishScreen ({ points, maxPossiblePoints, highScore }) {
	const percentage = Math.ceil(points / maxPossiblePoints * 100);
	const emoji = getEmojiFromPercentage(percentage);

	return <>
		<p className="result">
			<span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPossiblePoints} ({percentage}%)
		</p>
		<p className="highscore">(HighScore: {highScore} points)</p>
	</>;
};