import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Calculator from "./Calculator.jsx";
import ToggleSounds from "./ToggleSounds.jsx";

function formatTime (date) {
	return new Intl.DateTimeFormat("en", {
		month: "short",
		year: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	}).format(date);
}

function App () {
	const allowSound = useRef(true);
	const [time, setTime] = useState(formatTime(new Date()));

	const handleToggleSound = useCallback(() => {
		allowSound.current = !allowSound.current;
	}, []);

	// Will be AM or PM
	const partOfDay = time.slice(-2);

	const workouts = useMemo(() => [
		{
			name: "Full-body workout",
			numExercises: partOfDay === "AM" ? 9 : 8,
		},
		{
			name: "Arms + Legs",
			numExercises: 6,
		},
		{
			name: "Arms only",
			numExercises: 3,
		},
		{
			name: "Legs only",
			numExercises: 4,
		},
		{
			name: "Core only",
			numExercises: partOfDay === "AM" ? 5 : 4,
		},
	], [partOfDay]);

	useEffect(function () {
		const id = setInterval(function () {
			setTime(formatTime(new Date()));
		}, 1000);

		return () => clearInterval(id);
	}, []);

	return (
		<main>
			<h1>Workout timer</h1>
			<time>For your workout on {time}</time>
			<ToggleSounds allowSound={allowSound} onToggleSound={handleToggleSound}/>
			<Calculator workouts={workouts} allowSound={allowSound}/>
		</main>
	);
}

export default App;
