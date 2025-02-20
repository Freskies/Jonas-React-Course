import { useEffect, useState } from "react";

export function useTimer (seconds, { onTimeout, onTick }) {
	const [remainingSeconds, setRemainingSeconds] = useState(seconds);

	useEffect(() => {
		const idTimer = setInterval(() => {
			onTick?.(remainingSeconds);
			if (remainingSeconds === 0) onTimeout?.();
			setRemainingSeconds(remainingSeconds => remainingSeconds - 1);
		}, 1000);
		return () => clearInterval(idTimer);
	}, [onTick, onTimeout, remainingSeconds]);

	return remainingSeconds;
}