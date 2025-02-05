import { friendType } from "../Friends.js";
import Button from "./Button.jsx";
import PropTypes from "prop-types";

Friend.propTypes = {
	friend: friendType.isRequired,
	onSelectFriend: PropTypes.func.isRequired,
	isSelected: PropTypes.bool.isRequired
};

export default function Friend ({ friend: {id, image, name, balance }, onSelectFriend, isSelected }) {
	return <li className={isSelected ? "selected" : ""}>
		<img src={image} alt={name}/>
		<h3>{name}</h3>
		{balance < 0 && <p className="red">You owe {name} {Math.abs(balance).toFixed(0)}€</p>}
		{balance > 0 && <p className="green">{name} owes you {balance.toFixed(0)}€</p>}
		{balance === 0 && <p>You and {name} are even</p>}
		<Button onClick={() => onSelectFriend(id)}>{isSelected ? "Close" : "Select"}</Button>
	</li>;
}