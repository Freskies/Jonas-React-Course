import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import styled from "styled-components";

const Main = styled.main`
	padding: 4rem 4.8rem 6.4rem;
	background-color: var(--color-grey-50);
`;

const StyledAppLayout = styled.div`
	height: 100dvh;
	display: grid;
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
`;

function AppLayout () {
	return <StyledAppLayout>
		<Header/>
		<Sidebar/>
		<Main>
			<Outlet/>
		</Main>
	</StyledAppLayout>;
}

export default AppLayout;