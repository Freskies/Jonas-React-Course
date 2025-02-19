import PropTypes from "prop-types";
import Option from "./Option.jsx";

Question.propTypes = {
	question: PropTypes.shape({
		"question": PropTypes.string.isRequired,
		"options": PropTypes.arrayOf(PropTypes.string).isRequired,
		"correctOption": PropTypes.number.isRequired,
		"points": PropTypes.number.isRequired,
	}),
	answer: PropTypes.number || null,
	dispatch: PropTypes.func.isRequired,
};

export default function Question ({
	question: { question, options, correctOption, points },
	answer,
	dispatch,
}) {
	const isAnswered = Boolean(answer);

	function handleSelectOption (index) {
		dispatch({ type: "newAnswer", payload: index });
	}

	return <div>
		<h4>{question}</h4>
		<div className="options">
			{options.map((option, i) =>
				<Option
					isSelected={answer === i}
					isCorrect={correctOption === i}
					isAnswered={isAnswered}
					onSelectOption={() => handleSelectOption(i)}
					key={option}
				>
					{option}
				</Option>,
			)}
		</div>
	</div>;
};