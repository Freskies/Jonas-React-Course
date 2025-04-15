import { Link } from "react-router-dom";

const className = `bg-yellow-400 uppercase font-semibold text-stone-800 py-3 px-4 rounded-full inline-block
		tracking-wide hover:bg-yellow-300 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring
		focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4`;

function Button ({ disabled, children, to }) {
	if (to)
		return <Link to={to} className={className}>{children}</Link>;

	return <button
		disabled={disabled}
		className={className}
	>
		{children}
	</button>;
}

export default Button;