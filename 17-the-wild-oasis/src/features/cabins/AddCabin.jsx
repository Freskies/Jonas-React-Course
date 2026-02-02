import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Button from "../../ui/Button.jsx";

function AddCabin () {
	return <Modal>
		<Modal.Open opens={"cabin-form"}>
			{openModal => <Button onClick={() => openModal("cabin-form")}>Add new cabin</Button>}
		</Modal.Open>
		<Modal.Window name="cabin-form">
			{closeModal => <CreateCabinForm onCloseModal={closeModal}/>}
		</Modal.Window>
	</Modal>;
}

export default AddCabin;