import AccordionItem from "./AccordionItem.jsx";
import { useState } from "react";
import PropTypes from "prop-types";

Accordion.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			text: PropTypes.string,
			jsx: PropTypes.node,
		}),
	).isRequired,
};

export default function Accordion ({ data }) {
	const [openElement, setOpenElement] = useState(null);

	function handleToggle (num) {
		setOpenElement(num === openElement ? null : num);
	}

	return <div className="accordion">
		{data.map(
			(item, i) => <AccordionItem
				key={i}
				num={i + 1}
				title={item.title}
				isOpen={openElement === i + 1}
				onToggle={handleToggle}
			>
				{item.text && <p>{item.text}</p>}
				{item.jsx}
			</AccordionItem>,
		)}
	</div>;
}