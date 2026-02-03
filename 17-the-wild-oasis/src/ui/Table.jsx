import styled from "styled-components";
import { createContext, useContext } from "react";
import Empty from "./Empty.jsx";

const StyledTable = styled.div`
	border: 1px solid var(--color-grey-200);

	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border-radius: 7px;
	overflow: hidden;
`;

const CommonRow = styled.div`
	display: grid;
	grid-template-columns: ${(props) => props.$columns};
	column-gap: 2.4rem;
	align-items: center;
	transition: none;
`;

const StyledHeader = styled(CommonRow)`
	padding: 1.6rem 2.4rem;

	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: 600;
	color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
	padding: 1.2rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const StyledBody = styled.section`
	margin: 0.4rem 0;
`;

const StyledFooter = styled.footer`
	background-color: var(--color-grey-50);
	display: flex;
	justify-content: center;
	padding: 1.2rem;

	&:not(&:has(&*)) {
		display: none;
	}
`;

const TableContext = createContext(null);

function useTable () {
	const context = useContext(TableContext);
	if (!context) throw new Error("useTable must be used within a Table component");
	return context;
}

function Table ({ columns, children }) {
	return <TableContext.Provider value={{ columns }}>
		<StyledTable role={"table"}>
			{children}
		</StyledTable>
	</TableContext.Provider>;
}

function Header ({ children }) {
	const { columns } = useTable();

	return <StyledHeader role={"row"} $columns={columns} as={"header"}>
		{children}
	</StyledHeader>;
}

function Row ({ children }) {
	const { columns } = useTable();

	return <StyledRow role={"row"} $columns={columns}>
		{children}
	</StyledRow>;
}

function Body ({ data, render }) {
	if (!data.length) return <Empty>No data available</Empty>;
	return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = StyledFooter;

export default Table;
