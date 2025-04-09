import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
	isLoading: false,
};

const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		deposit (state, { payload }) {
			state.balance += payload;
			state.isLoading = false;
		},
		withdraw (state, { payload }) {
			state.balance -= payload;
		},
		requestLoan: {
			prepare (amount, purpose) {
				return { payload: { amount, purpose } };
			},
			reducer (state, { payload }) {
				if (state.loan > 0) return;
				state.loan = payload.amount;
				state.loanPurpose = payload.purpose;
				state.balance += payload.amount;
			},
		},
		payLoan (state) {
			state.balance -= state.loan;
			state.loan = 0;
			state.loanPurpose = "";
		},
		convertingCurrency (state) {
			state.isLoading = true;
		}
	},
});

function deposit (amount, currency) {
	if (currency === "USD")
		return { type: "account/deposit", payload: amount };

	return async function (dispatch) {
		dispatch({ type: "account/convertingCurrency" });
		const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
		const data = await res.json();
		const convertedAmount = data.rates.USD;
		return dispatch({ type: "account/deposit", payload: convertedAmount });
	};
}

export default accountSlice.reducer;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export { deposit };

/*
function accountReducer (state = initialState, { type, payload }) {
	switch (type) {
		case "account/deposit":
			return { ...state, balance: state.balance + payload, isLoading: false };
		case "account/withdraw":
			return { ...state, balance: state.balance - payload };
		case "account/requestLoan":
			if (state.loan > 0) return state;
			return {
				...state,
				loan: payload.amount,
				loanPurpose: payload.purpose,
				balance: state.balance + payload.amount,
			};
		case "account/payLoan":
			return { ...state, loan: 0, loanPurpose: "", balance: state.balance - state.loan };
		case "account/convertingCurrency":
			return { ...state, isLoading: true };
		default:
			return state;
	}
}

function deposit (amount, currency) {
	if (currency === "USD")
		return { type: "account/deposit", payload: amount };

	return async function (dispatch) {
		dispatch({ type: "account/convertingCurrency" });
		const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`);
		const data = await res.json();
		const convertedAmount = data.rates.USD;
		return dispatch({ type: "account/deposit", payload: convertedAmount });
	};
}

function withdraw (amount) {
	return { type: "account/withdraw", payload: amount };
}

function requestLoan (amount, purpose) {
	return {
		type: "account/requestLoan",
		payload: { amount, purpose },
	};
}

function payLoan () {
	return { type: "account/payLoan" };
}

export default accountReducer;
export { deposit, withdraw, requestLoan, payLoan };
*/