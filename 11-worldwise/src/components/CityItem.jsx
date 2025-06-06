import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext.jsx";

function formatDate (date) {
	return new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));
}

export default function CityItem ({ city }) {
	const { currentCity, deleteCity } = useCities();
	const { cityName, emoji, date, id, position: { lat, lng } } = city;

	function handleDeleteClick (e) {
		e.preventDefault();
		deleteCity(id);
	}

	return <li>
		<Link
			to={`${id}?lat=${lat}&lng=${lng}`}
			className={`${styles.cityItem} ${id === currentCity?.id ? styles["cityItem--active"] : ""}`}
		>
			<span className={styles.emoji}>{emoji}</span>
			<h3 className={styles.name}>{cityName}</h3>
			<time className={styles.date}>{formatDate(date)}</time>
			<button
				className={styles.deleteBtn}
				onClick={handleDeleteClick}
			>&times;</button>
		</Link>
	</li>;
};