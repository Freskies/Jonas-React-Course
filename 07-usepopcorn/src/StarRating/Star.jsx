const starStyle = {
	width: "48px",
	height: "48px",
	display: "block",
	cursor: "pointer",
};

export default function Star ({ onClick, onMouseEnter, onMouseLeave, children }) {
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