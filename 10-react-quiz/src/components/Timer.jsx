import { useTimer } from "../custom-hooks/useTimer.js";
import PropTypes from "prop-types";

Timer.propTypes = {
	dispatch: PropTypes.func.isRequired,
	remainingSeconds: PropTypes.number | null,
};

export default function Timer ({ dispatch, remainingSeconds }) {
	const options = {
		onTimeout: () => dispatch({ type: "finish" }),
		onTick: remainingSeconds => dispatch({ type: "setRemainingSeconds", payload: remainingSeconds }),
	};
	useTimer(remainingSeconds, options);

	const min = Math.floor(remainingSeconds / 60);
	const seconds = remainingSeconds % 60;

	return <div className="timer">
		{min.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
	</div>;
};