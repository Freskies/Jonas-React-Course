import { useTimer } from "../custom-hooks/useTimer.js";
import PropTypes from "prop-types";

Timer.propTypes = {
	dispatch: PropTypes.func.isRequired,
	remainingSeconds: PropTypes.number.isRequired,
};

export default function Timer ({ dispatch, remainingSeconds }) {
	const options = {
		onTimeout: () => dispatch({ type: "finish" }),
		onTick: remainingSeconds => dispatch({ type: "setRemainingSeconds", payload: remainingSeconds }),
	};
	useTimer(remainingSeconds, options);

	return <div className="timer">
		{remainingSeconds}
	</div>;
};