import AccordionItem from "./AccordionItem.jsx";
import { useState } from "react";
import PropTypes from "prop-types";

Accordion.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
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
				text={item.text}
				isOpen={openElement === i + 1}
				onToggle={handleToggle}
			/>,
		)}
	</div>;
}