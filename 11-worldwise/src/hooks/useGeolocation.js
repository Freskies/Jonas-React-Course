import { useState } from "react";

export function useGeolocation (defaultPosition = null) {
	const [isLoading, setIsLoading] = useState(false);
	const [position, setPosition] = useState(defaultPosition);
	const [error, setError] = useState(null);

	function getPosition () {
		if (navigator.geolocation) {
			setIsLoading(true);
			navigator.geolocation.getCurrentPosition(
				pos => {
					setPosition({
						lat: pos.coords.latitude,
						lng: pos.coords.longitude,
					});
					setIsLoading(false);
				},
				error => {
					setError(error.message);
					setIsLoading(false);
				},
			);
		} else setError("Your browser does not support geolocation");
	}

	return { isLoading, position, error, getPosition };
}