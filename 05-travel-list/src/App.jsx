import PropTypes from "prop-types";
import { useState } from "react";

const initialItems = [
	{ id: 1, description: "Passports", quantity: 2, packed: false },
	{ id: 2, description: "Socks", quantity: 12, packed: true },
	{ id: 3, description: "Charger", quantity: 12, packed: false },
];

function App () {

	return <div className="app">
		<Logo/>
		<Form/>
		<PackingList/>
		<Stats/>
	</div>;
}

function Logo () {
	return <h1>🌴 Far Away 💼</h1>;
}

function Form () {
	const [descriptionField, setDescriptionField] = useState("");
	const [quantityField, setQuantityField] = useState(1);

	function handleSubmit (e) {
		e.preventDefault();
		if (!descriptionField) return;

		const newItem = {
			description: descriptionField,
			quantity: quantityField,
			packed: false,
			id: Date.now()
		}

		setDescriptionField("");
		setQuantityField(1);
		console.log(newItem);
	}

	return <form className="add-form" onSubmit={handleSubmit}>
		<h3>What do you need for your 😍 trip?</h3>
		<select value={quantityField} onChange={e => setQuantityField(+e.target.value)}>
			{Array.from({ length: 20 }, (_, i) => i + 1).map(
				n => <option value={n + ""} key={n + ""}>{n}</option>,
			)}
		</select>
		<input
			type="text"
			placeholder="Item..."
			value={descriptionField}
			onChange={e => setDescriptionField(e.target.value)}
		/>
		<button>Add</button>
	</form>;
}

function PackingList () {
	return <div className="list">
		<ul>{initialItems.map(item => <Item item={item} key={item.id}/>)}</ul>
	</div>;
}

Item.propTypes = {
	item: PropTypes.shape({
		description: PropTypes.string.isRequired,
		quantity: PropTypes.number.isRequired,
		packed: PropTypes.bool.isRequired,
	}).isRequired,
};

function Item ({ item: { quantity, description, packed } }) {
	return <li className="item">
		<span className={packed ? "packed" : ""}>
			{quantity} {description}
		</span>
		<button>❌</button>
	</li>;
}

function Stats () {
	return <footer className="stats">
		<em>You have X items on your list, and you already packed X (X%)</em>
	</footer>;
}

export default App;