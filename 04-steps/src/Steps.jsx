import { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button.jsx";

Steps.propTypes = {
	messages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default function Steps ({ messages }) {
	const [step, setStep] = useState(1);
	const [isOpen, setIsOpen] = useState(true);

	function handlePrevious () {
		if (step > 1) setStep(curStep => curStep - 1);
	}

	function handleNext () {
		if (step < messages.length) setStep(curStep => curStep + 1);
	}

	function handleClose () {
		setIsOpen((isOpen) => !isOpen);
	}

	return <>
		<button className="close" onClick={handleClose}>&times;</button>
		{isOpen && (
			<div className="steps">
				<div className="numbers">
					{messages.map((_, i) =>
						<div key={i} className={step >= i + 1 ? "active" : ""}>{i + 1}</div>,
					)}
				</div>

				<div className="message">Step {step}: {messages[step - 1]}</div>

				<div className="buttons">
					<Button onClick={handlePrevious}>👈 Previous</Button>
					<Button onClick={handleNext}>Next 👉</Button>
				</div>
			</div>
		)}
	</>;
}