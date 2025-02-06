import Star from "./Star.jsx";
import { useState } from "react";
import FullStar from "./FullStar.jsx";
import EmptyStar from "./EmptyStar.jsx";

const containerStyle = {
	display: "flex",
	alignItems: "center",
	gap: "16px",
};

const starContainerStyle = {
	display: "flex",
};

const textStyle = {
	lineHeight: "1",
	margin: "0",
};

export default function StarRating ({ maxRating: mr }) {
	const maxRating = mr ?? 5;
	if (maxRating < 1) throw new Error("maxRating must be greater than 0");

	const [rating, setRating] = useState(0);
	const [tempRating, setTempRating] = useState(0);

	return <div style={containerStyle}>
		<div style={starContainerStyle}>
			{Array.from({ length: maxRating }, (_, i) =>
				<Star
					key={i}
					onClick={() => setRating(i + 1)}
					onMouseEnter={() => setTempRating(i + 1)}
					onMouseLeave={() => setTempRating(0)}
				>
					{(tempRating || rating) >= i + 1 ? <FullStar/> : <EmptyStar/>}
				</Star>,
			)}
		</div>
		<p style={textStyle}>{tempRating || rating || ""}</p>
	</div>;
}