import styled from "styled-components";

import BookingDataBox from "./BookingDataBox.jsx";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import ButtonText from "../../ui/ButtonText.jsx";

import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useBooking } from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import Menus from "../../ui/Menus.jsx";
import { HiArrowDownOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useCheckout } from "../check-in-out/useCheckout.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import { useDeleteBooking } from "./useDeleteBooking.js";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail () {
	const { isPending, booking = {} } = useBooking();
	const navigate = useNavigate();
	const { status, id: bookingId } = booking;
	const { checkOut, isCheckingOut } = useCheckout();
	const { deleteBooking, isDeleting } = useDeleteBooking();

	const moveBack = useMoveBack();

	if (isPending) return <Spinner/>;

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return <>
		<Row type="horizontal">
			<HeadingGroup>
				<Heading as="h1">Booking #{bookingId}</Heading>
				<Tag $type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
			</HeadingGroup>
			<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
		</Row>

		<BookingDataBox booking={booking}/>

		<Modal>
			<ButtonGroup>
				<Modal.Open name={"delete-booking"}>
					<Button $variation={"danger"} disabled={isDeleting}>Delete</Button>
				</Modal.Open>
				{status === "unconfirmed" && (
					<Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>
				)}
				{status === "checked-in" && (
					<Button onClick={() => checkOut(bookingId)} disabled={isCheckingOut}>Check out</Button>
				)}
				<Button $variation="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>

			<Modal.Window name={"delete-booking"}>
				<ConfirmDelete resourceName={"booking"} onConfirm={() => {
					deleteBooking(bookingId, {
						onSettled: () => navigate(-1),
					});
				}}/>
			</Modal.Window>
		</Modal>

	</>;
}

export default BookingDetail;
