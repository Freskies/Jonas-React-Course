import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import useDeleteCabin from "./useDeleteCabin.js";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Price = styled.div`
	font-family: "Sono", serif;
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono", serif;
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinRow ({ cabin }) {
	const { isDeleting, deleteCabin } = useDeleteCabin();
	const { isCreating, createCabin } = useCreateCabin();

	const { id: cabinId, image, name, maxCapacity, regularPrice, discount } = cabin;

	function handleDuplicate () {
		const duplicateCabin = { ...cabin, name: `${name} (copy)` };
		delete duplicateCabin.id;
		createCabin(duplicateCabin);
	}

	return <>
		<Table.Row>
			<Img src={image}/>
			<Cabin>{name}</Cabin>
			<div>Fits up to {maxCapacity} guests</div>
			<Price>{formatCurrency(regularPrice)}</Price>
			{discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}
			<div>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={cabinId}/>
						<Menus.List id={cabinId}>
							<Menus.Button onClick={handleDuplicate}>
								<HiSquare2Stack/>
								<span>Duplicate</span>
							</Menus.Button>

							<Modal.Open name={`cabin-${cabinId}`}>
								<Menus.Button>
									<HiPencil/>
									<span>Edit</span>
								</Menus.Button>
							</Modal.Open>

							<Modal.Open name={`delete-cabin-${cabinId}`}>
								<Menus.Button>
									<HiTrash/>
									<span>Delete</span>
								</Menus.Button>
							</Modal.Open>
						</Menus.List>
					</Menus.Menu>

					<Modal.Window name={`cabin-${cabinId}`}>
						<CreateCabinForm cabinToEdit={cabin}/>
					</Modal.Window>
					<Modal.Window name={`delete-cabin-${cabinId}`}>
						<ConfirmDelete resourceName={name} onConfirm={() => deleteCabin(cabinId)} disabled={isDeleting}/>
					</Modal.Window>
				</Modal>
			</div>
		</Table.Row>
	</>;
}

export default CabinRow;