import { memo, useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator ({ workouts, allowSound }) {
	const [number, setNumber] = useState(workouts.at(0).numExercises);
	const [sets, setSets] = useState(3);
	const [speed, setSpeed] = useState(90);
	const [durationBreak, setDurationBreak] = useState(5);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		setDuration((number * sets * speed) / 60 + (sets - 1) * durationBreak);
	}, [durationBreak, number, sets, speed]);

	useEffect(() => {
		if (!allowSound.current) return;
		const sound = new Audio(clickSound);
		sound.play();
	}, [allowSound, duration]);

	const minutes = Math.floor(duration);
	const seconds = (duration - minutes) * 60;

	function handleInc () {
		setDuration(prevDuration => Math.floor(prevDuration) + 1);
	}

	function handleDec () {
		setDuration(prevDuration => prevDuration > 1 ? Math.ceil(prevDuration) - 1 : 0);
	}

	return (
		<>
			<form>
				<div>
					<label>Type of workout</label>
					<select value={number} onChange={(e) => setNumber(+e.target.value)}>
						{workouts.map((workout) => (
							<option value={workout.numExercises} key={workout.name}>
								{workout.name} ({workout.numExercises} exercises)
							</option>
						))}
					</select>
				</div>
				<div>
					<label>How many sets?</label>
					<input
						type="range"
						min="1"
						max="5"
						value={sets}
						onChange={(e) => setSets(e.target.value)}
					/>
					<span>{sets}</span>
				</div>
				<div>
					<label>How fast are you?</label>
					<input
						type="range"
						min="30"
						max="180"
						step="30"
						value={speed}
						onChange={(e) => setSpeed(e.target.value)}
					/>
					<span>{speed} sec/exercise</span>
				</div>
				<div>
					<label>Break length</label>
					<input
						type="range"
						min="1"
						max="10"
						value={durationBreak}
						onChange={(e) => setDurationBreak(e.target.value)}
					/>
					<span>{durationBreak} minutes/break</span>
				</div>
			</form>
			<section>
				<button onClick={handleDec}>–
				</button>
				<p>
					{minutes < 10 && "0"}
					{minutes}:{seconds < 10 && "0"}
					{seconds}
				</p>
				<button onClick={handleInc}>+
				</button>
			</section>
		</>
	);
}

export default memo(Calculator);
