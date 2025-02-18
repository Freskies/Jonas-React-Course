import { useEffect } from "react";

export function useKeyDown (keyCode, action) {
	function listenEscEffect () {
		function callback (e) {
			if (e.code.toLocaleLowerCase() === keyCode.toLocaleLowerCase()) action();
		}

		document.addEventListener("keydown", callback);
		return () => document.removeEventListener("keydown", callback);
	}

	useEffect(listenEscEffect, [keyCode, action]);
}