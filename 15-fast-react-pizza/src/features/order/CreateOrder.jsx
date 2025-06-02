import { Form, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getCart, getTotalCartPrice } from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
import { formatCurrency } from "../../utils/helpers.js";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice.js";

function FieldContainer ({ children, label }) {
	return <div className={`mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative`}>
		<label className={"sm:basis-40"}>{label}</label>
		{children}
	</div>;
}

const PERCENTAGE_PRIORITY = 1.2;

function priceWithPriority (total) {
	return total * PERCENTAGE_PRIORITY;
}

function CreateOrder () {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [withPriority, setWithPriority] = useState(false);
	const { username, status: addressStatus, position, address } = useSelector(state => state.user);
	const isLoadingAddress = addressStatus === "loading";
	const isSubmitting = navigation.state === "submitting";

	const formErrors = useActionData();

	const cart = useSelector(getCart);
	const totalCartPrice = useSelector(getTotalCartPrice);
	const totalPrice = withPriority ? priceWithPriority(totalCartPrice) : totalCartPrice;

	if (!cart.length) return <EmptyCart/>;

	function handleGetPosition (e) {
		e.preventDefault();
		dispatch(fetchAddress());
	}

	return <div className={`px-3 py-6`}>
		<h2 className={`text-xl font-semibold mb-8`}>Ready to order? Let's go!</h2>

		<Form method="POST">
			<FieldContainer label="First Name">
				<input className="input grow" type="text" name="customer" defaultValue={username} required/>
			</FieldContainer>

			<FieldContainer label="Phone number">
				<div className={`grow`}>
					<input className="input w-full" type="tel" name="phone" required/>
					{formErrors?.phone &&
						<p className={`text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md`}>
							{formErrors.phone}
						</p>}
				</div>
			</FieldContainer>

			<FieldContainer label="Address">
				<div className={`grow`}>
					<input
						defaultValue={address}
						disabled={isLoadingAddress}
						className="input w-full"
						type="text"
						name="address"
						required
					/>
				</div>
				{!position.latitude && !position.longitude && <span className={`absolute right-1 z-50`}>
					<Button disabled={isLoadingAddress} type="small" onClick={handleGetPosition}>GET POSITION</Button>
				</span>}
			</FieldContainer>

			<div className={`mb-12 flex gap-5 items-center`}>
				<input
					className={`h-6 w-6 accent-yellow-400 focus:ring focus:ring-offset-2 focus:ring-yellow-400`}
					type="checkbox"
					name="priority"
					id="priority"
					value={"" + withPriority}
					onChange={(e) => setWithPriority(e.target.checked)}
				/>
				<label className={`font-medium`} htmlFor="priority">Want to yo give your order priority?</label>
			</div>

			<div>
				<input type="hidden" name="cart" value={JSON.stringify(cart)}/>
				<Button type="primary" disabled={isSubmitting || isLoadingAddress}>
					{isSubmitting ? "Placing order..." : `Order now for ${formatCurrency(totalPrice)}`}
				</Button>
			</div>
		</Form>
	</div>;
}

export default CreateOrder;
