import { Outlet } from "react-router";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import styled from "styled-components";

const StyledAppLayout = styled.div`
	display: grid;
	grid-template-areas:
		"sidebar header"
		"sidebar main";
	grid-template-columns: 26rem 1fr;
	grid-template-rows: auto 1fr;
	height: 100vh;
`;

const Main = styled.main`
	background-color: var(--color-grey-50);
	padding: 4rem 4.8rem 6.4rem;
	grid-area: main;
	overflow: auto;
`;

const Container = styled.div`
	max-width: 120rem;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	gap: 3.2rem;
`;

function AppLayout () {
	return <StyledAppLayout>
		<Header/>
		<Sidebar/>
		<Main>
			<Container>
				<Outlet/>
			</Container>
		</Main>
	</StyledAppLayout>;
}

export default AppLayout;