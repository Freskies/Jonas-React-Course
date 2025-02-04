import { useState } from "react";

function App () {
	const [step, setStep] = useState(1);
	const [count, setCount] = useState(1);

	function handlePreviousStep () {
		if (step > 1) setStep(curStep => curStep - 1);
	}

	function handleNextStep () {
		setStep(curStep => curStep + 1);
	}

	function handlePreviousCount () {
		setCount(curCount => curCount - step);
	}

	function handlePNextCount () {
		setCount(curCount => curCount + step);
	}

	return <div className="date-component">
		<div className="step">
			<button onClick={handlePreviousStep}>-</button>
			<span>Step: {step}</span>
			<button onClick={handleNextStep}>+</button>
		</div>
		<div className="count">
			<button onClick={handlePreviousCount}>-</button>
			<span>Count: {count}</span>
			<button onClick={handlePNextCount}>+</button>
		</div>
		<p className="phase">
			{count === 0 && `Today is `}
			{count > 0 && `${count} days from today is `}
			{count < 0 && `${count} days ago was `}
			{new Date(Date.now() + count * 24 * 60 * 60 * 1000).toString().substring(0, 15)}
		</p>
	</div>;
}

export default App;