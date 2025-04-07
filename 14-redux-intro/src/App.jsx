import CreateCustomer from "./features/customers/CreateCustomer.jsx";
import Customer from "./features/customers/Customer.jsx";
import AccountOperations from "./features/accounts/AccountOperations.jsx";
import BalanceDisplay from "./features/accounts/BalanceDisplay.jsx";
import { useSelector } from "react-redux";

function App () {
	const customerName = useSelector(store => store.customer.fullName);

	return <div>
		<h1>🏦 The React-Redux Bank ⚛️</h1>
		{customerName
			? <>
				<Customer/>
				<AccountOperations/>
				<BalanceDisplay/>
			</>
			: <CreateCustomer/>
		}
	</div>;
}

export default App;
