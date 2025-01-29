import { itemType } from "./itemType.js";
import PropTypes from "prop-types";

Item.propTypes = {
	item: itemType,
	onDeleteItem: PropTypes.func,
	onToggleItem: PropTypes.func,
};

export default function Item ({ item: { id, quantity, description, packed }, onDeleteItem, onToggleItem }) {
	return <li className="item">
		<input type="checkbox" value={packed} onChange={() => onToggleItem(id)}/>
		<span className={packed ? "packed" : ""}>
			{quantity} {description}
		</span>
		<button onClick={() => onDeleteItem(id)}>❌</button>
	</li>;
}