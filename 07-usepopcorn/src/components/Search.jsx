import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

Search.propTypes = {
	query: PropTypes.string.isRequired,
	onSetQuery: PropTypes.func.isRequired,
};

export default function Search ({ query, onSetQuery }) {

	const inputElement = useRef(null);

	function setFocusOnSearchBar () {
		inputElement.current.focus();
	}

	function listenEnterKeyEffect () {
		function callback (e) {
			if (document.activeElement === inputElement.current) return;
			if (e.code === "Enter") {
				setFocusOnSearchBar();
				onSetQuery("");
			}
		}

		document.addEventListener("keydown", callback);
		return () => document.removeEventListener("keydown", callback);
	}

	useEffect(setFocusOnSearchBar, []);

	useEffect(listenEnterKeyEffect, [onSetQuery]);

	return <input
		className="search"
		type="text"
		placeholder="Search movies..."
		value={query}
		onChange={e => onSetQuery(e.target.value)}
		ref={inputElement}
	/>;
}