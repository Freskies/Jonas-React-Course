import styles from "./CityList.module.css";
import Spinner from "./Spinner.jsx";
import CityItem from "./CityItem.jsx";
import Message from "./Message.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

export default function CityList () {
	const { cities, isLoading, error } = useCities();

	if (isLoading) return <Spinner/>;
	if (cities.error) return <Message message={error}/>;
	if (!cities.length) return <Message message="Add your first city by clicking on a city on the map"/>;

	return <ul className={styles.cityList}>
		{cities.map(city => <CityItem city={city} key={city.id}/>)}
	</ul>;
};