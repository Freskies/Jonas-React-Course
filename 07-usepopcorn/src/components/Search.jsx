import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useKeyDown } from "../customHooks/useKeyDown.js";

Search.propTypes = {
	query: PropTypes.string.isRequired,
	onSetQuery: PropTypes.func.isRequired,
};

export default function Search ({ query, onSetQuery }) {

	const inputElement = useRef(null);
	useKeyDown("enter", setFocusOnSearchBar);

	function setFocusOnSearchBar () {
		if (document.activeElement === inputElement.current) return;
		inputElement.current.focus();
		onSetQuery("");
	}

	useEffect(setFocusOnSearchBar, [onSetQuery]);

	return <input
		className="search"
		type="text"
		placeholder="Search movies..."
		value={query}
		onChange={e => onSetQuery(e.target.value)}
		ref={inputElement}
	/>;
}