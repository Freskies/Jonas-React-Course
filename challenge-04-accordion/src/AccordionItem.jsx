import PropTypes from "prop-types";

AccordionItem.propTypes = {
	num: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	isOpen: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
};

export default function AccordionItem ({ num, title, text, isOpen, onToggle }) {
	return <div className={`item ${isOpen ? "open" : ""}`} onClick={() => onToggle(num)}>
		<p className="number">{num.toString().padStart(2, "0")}</p>
		<p className="title">{title}</p>
		<p className="icon">{isOpen ? "-" : "+"}</p>
		{isOpen && <div className="content-box">{text}</div>}
	</div>;
}