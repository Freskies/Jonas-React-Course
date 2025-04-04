import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext.jsx";
import PropTypes from "prop-types";
import { useGeolocation } from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";

export default function Map () {
	const { cities } = useCities();
	const [mapPosition, setMapPosition] = useState(["40", "0"]);
	const { position: geolocationPosition, isLoadingPosition, getPosition } = useGeolocation();
	const [lat, lng] = useUrlPosition();
	const baseZoom = 13;

	useEffect(() => {
		if (!lat || !lng) return;
		setMapPosition([lat, lng]);
	}, [lat, lng]);

	useEffect(() => {
		if (geolocationPosition)
			setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
	}, [geolocationPosition]);

	return <div className={styles.mapContainer}>
		{!geolocationPosition &&
			<Button type={"position"} onClick={getPosition}>
				{isLoadingPosition ? "Loading... : " : "Use your position"}
			</Button>
		}
		<MapContainer
			className={styles.map}
			center={mapPosition}
			zoom={baseZoom}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
			/>
			{cities?.map(city => (
					<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
						<Popup>
							<span>{city.emoji}</span> <span>{city.cityName}</span>
						</Popup>
					</Marker>
				),
			)}
			<ChangeCenter position={mapPosition}/>
			<DetectClick/>
		</MapContainer>
	</div>;
};

ChangeCenter.propTypes = {
	position: PropTypes.array.isRequired,
};

function ChangeCenter ({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick () {
	const navigate = useNavigate();

	useMapEvents({
		click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
	});
}