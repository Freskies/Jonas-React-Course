import PropTypes from "prop-types";

NavBar.propTypes = {
	children: PropTypes.node,
};

export default function NavBar ({ children }) {
	return <nav className="nav-bar">
		{children}
	</nav>;
}