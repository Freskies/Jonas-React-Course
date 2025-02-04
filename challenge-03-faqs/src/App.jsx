import PropTypes from "prop-types";
import { useState } from "react";

const questions = [
	{
		id: 3457,
		question: "What language is React based on?",
		answer: "JavaScript",
	},
	{
		id: 7336,
		question: "What are the building blocks of React apps?",
		answer: "Components",
	},
	{
		id: 8832,
		question: "What's the name of the syntax we use to describe a UI in React?",
		answer: "JSX",
	},
	{
		id: 1297,
		question: "How to pass data from parent to child components?",
		answer: "Props",
	},
	{
		id: 9103,
		question: "How to give components memory?",
		answer: "useState hook",
	},
	{
		id: 2002,
		question:
			"What do we call an input element that is completely synchronised with state?",
		answer: "Controlled element",
	},
];

function App () {
	return <>
		{questions.map(question => <Card question={question} key={question.id}/>)}
	</>;
}

Card.propTypes = {
	question: PropTypes.shape({
		question: PropTypes.string.isRequired,
		answer: PropTypes.string.isRequired,
	}).isRequired,
};

function Card ({ question: { question, answer } }) {
	const [isOpen, setIsOpen] = useState(false);

	return <div
		onClick={() => setIsOpen(isOpen => !isOpen)}
		className={"card " + (isOpen ? "answer" : "question")}
	>
		<p>{isOpen ? answer : question}</p>
	</div>;
}

export default App;
