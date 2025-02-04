import Accordion from "./Accordion.jsx";

const faqs = [
	{
		title: "What is React?",
		text: "React is a JavaScript library for building user interfaces.",
	},
	{
		title: "How do I install React?",
		text: "You can install React using npm by running `npm install react`.",
	},
	{
		title: "What is JSX?",
		text: "JSX is a syntax extension for JavaScript that looks similar to XML or HTML.",
	},
	{
		title: "What are components?",
		text: "Components are the building blocks of a React application. They can be class-based or functional.",
	},
	{
		title: "What is state in React?",
		text: "State is an object that determines how a component renders and behaves.",
	},
];

export default function App () {
	return <Accordion data={faqs} />;
}