import styles from "./CountryList.module.css";
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CountryItem from "./CountryItem.jsx";
import { useCities } from "../contexts/CitiesContext.jsx";

export default function CountryList () {
	const { citiesFetch: { cities, isLoading, error } } = useCities();

	const countries = cities.reduce((acc, { country, emoji }) =>
		acc.some(({ country: accCountry }) => country === accCountry) ? acc : [...acc, { country, emoji }], []);
	if (isLoading) return <Spinner/>;
	if (!countries.length) return <Message message="No countries found"/>;
	if (error) return <Message message={error}/>;

	return <ul className={styles.countryList}>
		{countries?.map(country => <CountryItem country={country} key={country.country}/>)}
	</ul>;
};