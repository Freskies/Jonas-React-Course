export default function Star ({ onClick, onMouseEnter, onMouseLeave, children, color, size }) {
	const starStyle = {
		width: size,
		height: size,
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