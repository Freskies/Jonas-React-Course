import { friendType } from "../Friends.js";
import Button from "./Button.jsx";

Friend.propTypes = {
	friend: friendType,
};

export default function Friend ({ friend: { image, name, balance } }) {
	return <li>
		<img src={image} alt={name}/>
		<h3>{name}</h3>
		{balance < 0 && <p className="red">You owe {name} {Math.abs(balance).toFixed(0)}€</p>}
		{balance > 0 && <p className="green">{name} owes you {balance.toFixed(0)}€</p>}
		{balance === 0 && <p>You and {name} are even</p>}
		<Button>Select</Button>
	</li>;
}