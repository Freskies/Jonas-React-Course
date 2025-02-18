import { useEffect, useState } from "react";

export function useLocalStorage (key) {
	const [value, setValue] = useState(() => JSON.parse(localStorage.getItem(key)) ?? []);

	function saveOnLocalStorage () {
		localStorage.setItem(key, JSON.stringify(value));
	}

	useEffect(saveOnLocalStorage, [value, key]);

	return [value, setValue];
}