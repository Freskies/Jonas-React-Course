import PropTypes from "prop-types";

Button.propTypes = {
	action: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired,
};

export default function Button ({ action, children }) {
	return <button className="btn btn-ui" onClick={() => action()}>
		{children}
	</button>;
};