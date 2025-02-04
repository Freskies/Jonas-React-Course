import { useState } from "react";
import PropTypes from "prop-types";

export default function App () {
	const [bill, setBill] = useState(0);
	const [service, setService] = useState("good");
	const [friendService, setFriendService] = useState("good");

	function handleReset () {
		setBill(0);
		setService("Good");
		setFriendService("Good");
	}

	function getTipPercentage (service) {
		switch (service) {
			case "excellent":
				return 20;
			case "good":
				return 10;
			case "average":
				return 5;
			case "poor":
				return 0;
		}
	}

	function getTipMultiplier (service1, service2) {
		return 1 + ((getTipPercentage(service1) + getTipPercentage(service2)) / 200);
	}

	const finalBill = bill * getTipMultiplier(service, friendService);
	const tip = finalBill - bill;

	return <div className="bill-app">
		<p>How much was the bill?</p>
		<input
			type="number"
			step={0.01}
			value={bill.toString()}
			onChange={(e) => setBill(+e.target.value)}
		/>
		<p>How did you like the service?</p>
		<Service value={service} onChange={setService}/>
		<p>How did your friend like the service?</p>
		<Service value={friendService} onChange={setFriendService}/>
		{bill > 0 &&
			<p className="result">You pay ${finalBill.toFixed(2)} (${bill.toFixed(2)} + ${tip.toFixed(2)})</p>
		}

		<button className="reset" onClick={handleReset}>
			RESET
		</button>
	</div>;
}

Service.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
};

function Service ({ value, onChange }) {
	return <select value={value} onChange={(e) => onChange(e.target.value)}>
		<option value="excellent">Excellent</option>
		<option value="good">Good</option>
		<option value="average">Average</option>
		<option value="poor">Poor</option>
	</select>;
}