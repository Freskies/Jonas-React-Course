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
	const { currentCityFetch: { currentCity } } = useCities();
	const { cityName, emoji, date, id, position: { lat, lng } } = city;
	return <li>
		<Link
			to={`${id}?lat=${lat}&lng=${lng}`}
			className={`${styles.cityItem} ${id === currentCity?.id ? styles["cityItem--active"] : ""}`}
		>
			<span className={styles.emoji}>{emoji}</span>
			<h3 className={styles.name}>{cityName}</h3>
			<time className={styles.date}>{formatDate(date)}</time>
			<button className={styles.deleteBtn}>&times;</button>
		</Link>
	</li>;
};