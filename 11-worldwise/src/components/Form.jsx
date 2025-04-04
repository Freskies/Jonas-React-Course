import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button.jsx";
import ButtonBack from "./ButtonBack.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import DatePicker from "react-datepicker";
import { useCities } from "../contexts/CitiesContext.jsx";
import { useNavigate } from "react-router-dom";

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
	const { createCity, isLoading } = useCities();
	const navigate = useNavigate();

	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [emoji, setEmoji] = useState("");

	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [geocodingError, setGeocodingError] = useState("");

	async function handleSubmit (e) {
		e.preventDefault();

		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};

		await createCity(newCity);
		navigate("/app/cities");
	}

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

	return <form
		className={`${styles.form} ${isLoading ? styles.loading : ""}`}
		onSubmit={handleSubmit}
	>
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
			<DatePicker
				id="date"
				selected={date}
				onChange={date => setDate(date)}
				dateFormat="dd/MM/yyyy"
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