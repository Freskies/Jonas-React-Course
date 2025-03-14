import { useSearchParams } from "react-router-dom";

export function useUrlPosition () {
	const [searchParams] = useSearchParams();
	const mapLatitude = searchParams.get("lat");
	const mapLongitude = searchParams.get("lng");

	return [mapLatitude, mapLongitude];
}