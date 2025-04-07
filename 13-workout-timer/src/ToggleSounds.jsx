import { memo, useState } from "react";

function ToggleSounds ({ allowSound, onToggleSound }) {
	const [allowIcon, setAllowIcon] = useState(allowSound.current);

	function handleClick () {
		onToggleSound();
		setAllowIcon(prevAllowIcon => !prevAllowIcon);
	}

	return <button
		className="btn-sound"
		onClick={handleClick}
	>
		{allowIcon ? "🔈" : "🔇"}
	</button>;
}

export default memo(ToggleSounds);
