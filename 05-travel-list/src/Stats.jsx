import PropTypes from "prop-types";
import { itemType } from "./itemType.js";

Stats.propTypes = {
	items: PropTypes.arrayOf(itemType),
};

export default function Stats ({ items }) {
	if (!items.length)
		return <footer className="stats">
			<em>Start adding some items to your packing list 🚀</em>
		</footer>;

	const numberOfItems = items.length;
	const itemsPacked = items.reduce((acc, { packed }) => packed ? acc + 1 : acc, 0);
	const packedPercentage = itemsPacked / numberOfItems * 100;

	return <footer className="stats">
		<em>
			{packedPercentage === 100
				? "You got everything! ready to go 🛫"
				: `You have ${numberOfItems} items on your list,
				and you already packed ${itemsPacked} (${packedPercentage.toFixed(2)}%)`
			}
		</em>
	</footer>;
}