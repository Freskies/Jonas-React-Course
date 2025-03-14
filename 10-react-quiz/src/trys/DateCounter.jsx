import { useReducer } from "react";

const initialState = { count: 0, step: 1 };

function reducer (state, { type, payload }) {
	switch (type) {
		case "inc":
		case "dec": {
			const { count, step } = state;
			return { ...state, count: count + step };
		}
		case "setCount":
			return { ...state, count: Number(payload) };
		case "setStep":
			return { ...state, step: Number(payload) };
		case "reset":
			return initialState;
		default:
			throw new Error("Unknown action!");
	}
}

function DateCounter () {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { count, step } = state;

	const date = new Date("june 21 2027");
	date.setDate(date.getDate() + count);

	return (
		<div className="counter">
			<div>
				<input
					type="range"
					min="0"
					max="10"
					value={step}
					onChange={e => dispatch({ type: "setStep", payload: e.target.value })}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button onClick={() => dispatch({ type: "dec" })}>-</button>
				<input value={count} onChange={e => dispatch({ type: "setCount", payload: e.target.value })}/>
				<button onClick={() => dispatch({ type: "inc" })}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={() => dispatch({ type: "reset" })}>Reset</button>
			</div>
		</div>
	);
}

export default DateCounter;
