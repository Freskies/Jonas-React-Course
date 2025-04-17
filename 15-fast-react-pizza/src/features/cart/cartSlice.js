import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem (state, action) {
			state.cart.push(action.payload);
		},
		deleteItem (state, action) {
			state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
		},
		increaseItemQuantity (state, action) {
			const item = state.cart.find(item => item.pizzaId === action.payload);
			item.quantity++;
			item.totalPrice += item.unitPrice;
		},
		decreaseItemQuantity (state, action) {
			const item = state.cart.find(item => item.pizzaId === action.payload);
			item.quantity--;
			item.totalPrice -= item.unitPrice;
			if (!item.quantity) cartSlice.caseReducers.deleteItem(state, action);
		},
		clearCart (state) {
			state.cart = [];
		},
	},
});

function getCart (state) {
	return state.cart.cart;
}

function getNumberOfPizzas (state) {
	return state.cart.cart.reduce((acc, cur) => acc + cur.quantity, 0);
}

function getTotalCartPrice (state) {
	return state.cart.cart.reduce((acc, cur) => acc + cur.totalPrice, 0);
}

function getCurrentQuantityById (pizzaId) {
	return (state) => state.cart.cart.find(item => item.pizzaId === pizzaId)?.quantity || 0;
}

export { getCart, getNumberOfPizzas, getTotalCartPrice, getCurrentQuantityById };
export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
