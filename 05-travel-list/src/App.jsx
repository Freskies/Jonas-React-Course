import { useState } from "react";
import Logo from "./Logo.jsx";
import Form from "./Form.jsx";
import PackingList from "./PackingList.jsx";
import Stats from "./Stats.jsx";

export default function App () {
	const [items, setItems] = useState([]);

	function handleAddItems (item) {
		setItems(items => [...items, item]);
	}

	function handleDeleteItem (id) {
		setItems(items => items.filter(({ id: itemId }) => itemId !== id));
	}

	function handleToggleItem (id) {
		setItems(items => items.map(
			item => item.id === id ? { ...item, packed: !item.packed } : item,
		));
	}

	function handleClearItems () {
		setItems([])
	}

	return <div className="app">
		<Logo/>
		<Form onAddItems={handleAddItems}/>
		<PackingList
			items={items}
			onDeleteItem={handleDeleteItem}
			onToggleItem={handleToggleItem}
			onClearItems={handleClearItems}
		/>
		<Stats items={items}/>
	</div>;
}