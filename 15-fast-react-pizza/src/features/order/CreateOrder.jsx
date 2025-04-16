import { Form, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button.jsx";
import { useSelector } from "react-redux";

const fakeCart = [
	{
		pizzaId: 12,
		name: "Mediterranean",
		quantity: 2,
		unitPrice: 16,
		totalPrice: 32,
	},
	{
		pizzaId: 6,
		name: "Vegetale",
		quantity: 1,
		unitPrice: 13,
		totalPrice: 13,
	},
	{
		pizzaId: 11,
		name: "Spinach and Mushroom",
		quantity: 1,
		unitPrice: 15,
		totalPrice: 15,
	},
];

function FieldContainer ({ children, label }) {
	return <div className={`mb-5 flex flex-col gap-2 sm:flex-row sm:items-center`}>
		<label className={"sm:basis-40"}>{label}</label>
		{children}
	</div>;
}

function CreateOrder () {
	const username = useSelector(state => state.user.username);
	const navigation = useNavigation();
	const isSubmitting = navigation.state === "submitting";

	const formErrors = useActionData();

	// const [withPriority, setWithPriority] = useState(false);
	const cart = fakeCart;

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
					<input className="input w-full" type="text" name="address" required/>
				</div>
			</FieldContainer>

			<div className={`mb-12 flex gap-5 items-center`}>
				<input
					className={`h-6 w-6 accent-yellow-400 focus:ring focus:ring-offset-2 focus:ring-yellow-400`}
					type="checkbox"
					name="priority"
					id="priority"
					// value={withPriority}
					// onChange={(e) => setWithPriority(e.target.checked)}
				/>
				<label className={`font-medium`} htmlFor="priority">Want to yo give your order priority?</label>
			</div>

			<div>
				<input type="hidden" name="cart" value={JSON.stringify(cart)}/>
				<Button type="primary" disabled={isSubmitting}>
					{isSubmitting ? "Placing order..." : "Order now"}
				</Button>
			</div>
		</Form>
	</div>;
}

export default CreateOrder;
