import PropTypes from "prop-types";

const colors = {
	backgroundColor: "#7950f2",
	color: "#fff",
};

Button.propTypes = {
	onClick: PropTypes.func,
	children: PropTypes.node
}

export default function Button ({ onClick, children }) {
	return <button style={colors} onClick={onClick}>
		{children}
	</button>;
}