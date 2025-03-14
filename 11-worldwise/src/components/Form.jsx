import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import ButtonBack from "./ButtonBack.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

export function convertToEmoji (countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

export default function Form () {
	const [lat, lng] = useUrlPosition();

	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [emoji, setEmoji] = useState("");

	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [geocodingError, setGeocodingError] = useState("");

	useEffect(() => {
		if (!lat || !lng) {
			setGeocodingError("Start by clicking somewhere on the map");
			return;
		}

		async function fetchCityData (signal) {
			setIsLoadingGeocoding(true);
			setGeocodingError("");
			const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`, { signal });
			const data = await res.json();

			if (!data.countryCode)
				setGeocodingError("That doesn't seem to be a city. Click somewhere else");

			setCityName(data.city || data.locality || "");
			setCountry(data.countryName);
			setEmoji(convertToEmoji(data.countryCode));
		}

		const controller = new AbortController();
		fetchCityData(controller.signal)
			.catch(() => null)
			.finally(() => setIsLoadingGeocoding(false));
		return () => controller.abort();
	}, [lat, lng]);

	if (isLoadingGeocoding) return <Spinner/>;

	if (geocodingError) return <Message message={geocodingError}/>;

	return <form className={styles.form}>
		<div className={styles.row}>
			<label htmlFor="cityName">City name</label>
			<input
				id="cityName"
				onChange={(e) => setCityName(e.target.value)}
				value={cityName}
			/>
			<span className={styles.flag}>{emoji}</span>
		</div>

		<div className={styles.row}>
			<label htmlFor="date">When did you go to {cityName}?</label>
			<input
				id="date"
				onChange={(e) => setDate(e.target.value)}
				value={date}
			/>
		</div>

		<div className={styles.row}>
			<label htmlFor="notes">Notes about your trip to {cityName}</label>
			<textarea
				id="notes"
				onChange={(e) => setNotes(e.target.value)}
				value={notes}
			/>
		</div>

		<div className={styles.buttons}>
			<Button type="primary">Add</Button>
			<ButtonBack/>
		</div>
	</form>;
};