import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem (state, { payload }) {
			state.cart.push(payload);
		},
		deleteItem (state, { payload }) {
			state.cart = state.cart.filter(item => item.pizzaId !== payload);
		},
		increaseItemQuantity (state, { payload }) {
			const item = state.cart.find(item => item.pizzaId === payload);
			item.quantity++;
			item.totalPrice += item.unitPrice;
		},
		decreaseItemQuantity (state, { payload }) {
			const item = state.cart.find(item => item.pizzaId === payload);
			if (item.quantity < 2) return;
			item.quantity--;
			item.totalPrice -= item.unitPrice;
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

function getCurrentQuantity (state, pizzaId) {
	return state.cart.cart.find(item => item.pizzaId === pizzaId)?.quantity || 0;
}

export { getCart, getNumberOfPizzas, getTotalCartPrice, getCurrentQuantity };
export const { addItem, deleteItem, increaseItemQuantity, decreaseItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
