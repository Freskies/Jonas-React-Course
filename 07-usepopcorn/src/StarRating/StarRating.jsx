import Star from "./Star.jsx";
import { useState } from "react";
import FullStar from "./FullStar.jsx";
import EmptyStar from "./EmptyStar.jsx";
import PropTypes from "prop-types";

const DEFAULT_SIZE = 48;

const containerStyle = {
	display: "flex",
	alignItems: "center",
	gap: "16px",
};

const starContainerStyle = {
	display: "flex",
};

StarRating.propTypes = {
	maxRating: PropTypes.number,
	color: PropTypes.string,
	size: PropTypes.number,
	className: PropTypes.string,
	messages: PropTypes.arrayOf(PropTypes.string),
	defaultRating: PropTypes.number,
	onSetRating: PropTypes.func,
};

export default function StarRating ({
	maxRating = 5,
	color = "#fcc419",
	size = DEFAULT_SIZE,
	className = "",
	messages = [],
	defaultRating = 0,
	onSetRating,
}) {
	if (maxRating < 1) throw new Error("maxRating must be greater than 0");
	if (defaultRating < 0 && defaultRating > maxRating) throw new Error("defaultRating must be between 0 and maxRating");

	function handleSetRating (rating) {
		setRating(rating);
		onSetRating?.(rating);
	}

	const textStyle = {
		lineHeight: "1",
		margin: "0",
		color,
		fontSize: `${size * 0.5}px`,
	};

	const [rating, setRating] = useState(defaultRating);
	const [tempRating, setTempRating] = useState(0);

	return <div style={containerStyle} className={className}>
		<div style={starContainerStyle}>
			{Array.from({ length: maxRating }, (_, i) =>
				<Star
					key={i}
					onClick={() => handleSetRating(i + 1)}
					onMouseEnter={() => setTempRating(i + 1)}
					onMouseLeave={() => setTempRating(0)}
					color={color}
					size={size}
				>
					{(tempRating || rating) >= i + 1 ? <FullStar/> : <EmptyStar/>}
				</Star>,
			)}
		</div>
		<p style={textStyle}>
			{messages.length > 0
				? (tempRating || rating)
					? messages[Math.max(0, Math.round(messages.length * (tempRating || rating) / maxRating) - 1)]
					: ""
				: tempRating || rating || ""
			}
		</p>
	</div>;
}

// maxRating : messages.length = rating : x
// x =