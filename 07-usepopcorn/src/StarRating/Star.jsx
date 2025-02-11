import PropTypes from "prop-types";

Star.propTypes = {
	onClick: PropTypes.func.isRequired,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	children: PropTypes.node.isRequired,
	color: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired,
};

export default function Star ({ onClick, onMouseEnter, onMouseLeave, children, color, size }) {
	const starStyle = {
		width: `${size}px`,
		height: `${size}px`,
		display: "block",
		cursor: "pointer",
		color,
	};

	return <span
		style={starStyle}
		role="button"
		onClick={onClick}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
	>
		{children}
	</span>;
}