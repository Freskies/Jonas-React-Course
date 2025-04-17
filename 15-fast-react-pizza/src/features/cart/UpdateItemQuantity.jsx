import Button from "../../ui/Button.jsx";
import { useDispatch } from "react-redux";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice.js";

function UpdateItemQuantity ({ pizzaId, currentQuantity }) {
	const dispatch = useDispatch();

	function handleDecreaseQuantity () {
		dispatch(decreaseItemQuantity(pizzaId));
	}

	function handleIncreaseQuantity () {
		dispatch(increaseItemQuantity(pizzaId));
	}

	return <div className={`flex gap-1 items-center md:gap-3`}>
		<Button type="round" onClick={handleDecreaseQuantity}>-</Button>
		<span className={`text-sm font-medium gap-2`}>{currentQuantity}</span>
		<Button type="round" onClick={handleIncreaseQuantity}>+</Button>
	</div>;
}

export default UpdateItemQuantity;