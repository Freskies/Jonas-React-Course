import PropTypes from "prop-types";

Option.propTypes = {
	isSelected: PropTypes.bool.isRequired,
	isCorrect: PropTypes.bool.isRequired,
	isAnswered: PropTypes.bool.isRequired,
	onSelectOption: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

export default function Option ({ isSelected, isCorrect, isAnswered, children, onSelectOption }) {
	const isSelectedStyle = isSelected ? "answer" : "";
	const isCorrectStyle = isCorrect ? "correct" : "wrong";
	const style = `btn btn-option ${isAnswered ? `${isSelectedStyle} ${isCorrectStyle}` : ""}`;

	return <button
		className={style}
		onClick={onSelectOption}
		disabled={isAnswered}
	>
		{children}
	</button>;
}