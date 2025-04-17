import { Link } from "react-router-dom";

const base = `text-sm bg-yellow-400 uppercase font-semibold text-stone-800 rounded-full inline-block
		tracking-wide hover:bg-yellow-300 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring
		focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed`;

const styles = {
	primary: `${base} px-4 py-3 sm:px-6 sm:py-4`,
	small: `${base} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
	secondary: `px-4 py-3 inline-block rounded-full border-2 border-stone-300 bg-transparent uppercase font-semibold
	text-stone-400 tracking-wide hover:text-stone-800 hover:bg-stone-300 transition-colors duration-300 cursor-pointer
	focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-800 focus:bg-stone-300 focus:ring-offset-2
	disabled:cursor-not-allowed text-sm`,
	round: `rounded-full`,
};

function Button ({ disabled, children, to, type, onClick }) {
	if (!styles[type]) throw new Error("Unknown button type!");

	if (to)
		return <Link to={to} className={styles[type]}>{children}</Link>;

	return <button
		disabled={disabled}
		className={styles[type]}
		onClick={onClick}
	>
		{children}
	</button>;
}

export default Button;