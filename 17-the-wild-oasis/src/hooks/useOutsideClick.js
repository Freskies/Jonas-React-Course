import { useEffect, useRef } from "react";

export default function useOutsideClick (fn) {
	const ref = useRef(null);

	useEffect(() => {
		function handleClick (e) {
			if (!ref.current) return;
			if (ref.current.contains(e.target)) return;
			fn();
		}

		document.addEventListener("click", handleClick, true);
		return () => document.removeEventListener("click", handleClick);
	}, [fn]);

	return ref;
}