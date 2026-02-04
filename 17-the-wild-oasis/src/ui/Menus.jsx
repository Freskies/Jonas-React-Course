import styled from "styled-components";
import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick.js";

const StyledMenu = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const StyledToggle = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-700);
	}
`;

const StyledList = styled.ul`
	position: fixed;

	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-md);
	border-radius: var(--border-radius-md);

	right: ${(props) => props.$position.x}px;
	top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
	width: 100%;
	text-align: left;
	background: none;
	border: none;
	padding: 1.2rem 2.4rem;
	font-size: 1.4rem;
	transition: all 0.2s;

	display: flex;
	align-items: center;
	gap: 1.6rem;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 1.6rem;
		height: 1.6rem;
		color: var(--color-grey-400);
		transition: all 0.3s;
	}
`;

const MenusContext = createContext(null);

function useMenus () {
	const context = useContext(MenusContext);
	if (!context) throw new Error("useMenus must be used within a Menus component");
	return context;
}

function Menus ({ children }) {
	const [openId, setOpenId] = useState("");
	const [position, setPosition] = useState(null);
	const close = () => setOpenId("");
	const open = (id) => setOpenId(id);

	return <MenusContext.Provider value={{
		openId,
		open,
		close,
		position,
		setPosition,
	}}>
		{children}
	</MenusContext.Provider>;
}

function Button ({ children, onClick }) {
	const { close } = useMenus();

	function handleClick () {
		onClick?.();
		close();
	}

	return <li>
		<StyledButton onClick={handleClick}>{children}</StyledButton>
	</li>;
}

function Toggle ({ id }) {
	const { openId, open, close, setPosition } = useMenus();

	function handleClick (e) {
		const { width, height, x, y } = e.target.closest("button").getBoundingClientRect();
		setPosition({
			x: window.innerWidth - width - x,
			y: y + height + 8,
		});
		if (openId === id) close();
		else open(id);
	}

	return <StyledToggle onClick={handleClick}>
		<HiEllipsisVertical/>
	</StyledToggle>;
}

function List ({ id, children }) {
	const { openId, position, close } = useMenus();
	const ref = useOutsideClick(close);

	if (openId !== id) return null;

	return createPortal(
		<StyledList $position={position} ref={ref}>{children}</StyledList>,
		document.querySelector("body"),
	);
}

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;