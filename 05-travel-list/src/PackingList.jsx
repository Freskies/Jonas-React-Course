import PropTypes from "prop-types";
import { useState } from "react";
import { itemType } from "./itemType.js";
import Item from "./Item.jsx";

PackingList.propTypes = {
	items: PropTypes.arrayOf(itemType),
	onDeleteItem: PropTypes.func,
	onToggleItem: PropTypes.func,
	onClearItems: PropTypes.func,
};

export default function PackingList ({ items, onDeleteItem, onToggleItem, onClearItems }) {
	const [sortBy, setSortBy] = useState("input");

	function compareByInputOrder () {
		return 0;
	}

	function compareByDescription (a, b) {
		return a.description.localeCompare(b.description);
	}

	function compareByPackedStatus (a, b) {
		return a.packed === b.packed ? 0 : a.packed ? 1 : -1;
	}

	const sortedItems = items.toSorted((() => {
		switch (sortBy) {
			case "description":
				return compareByDescription;
			case "packed":
				return compareByPackedStatus;
			case "input":
			default:
				return compareByInputOrder;
		}
	})());

	return <div className="list">
		<ul>
			{sortedItems.map(item => <Item
				item={item}
				key={item.id}
				onDeleteItem={onDeleteItem}
				onToggleItem={onToggleItem}
			/>)}
		</ul>
		<div className="actions">
			<select value={sortBy} onChange={e => setSortBy(e.target.value)}>
				<option value="input">Sort by input order</option>
				<option value="description">Sort by description</option>
				<option value="packed">Sort by packed status</option>
			</select>
			<button onClick={onClearItems}>Clear list</button>
		</div>
	</div>;
}