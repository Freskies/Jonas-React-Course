import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Button from "../../ui/Button.jsx";

function AddCabin () {
	return <div>
		<Modal>
			<Modal.Open name={"cabin-form"}>
				<Button>Add new cabin</Button>
			</Modal.Open>
			<Modal.Window name="cabin-form">
				<CreateCabinForm/>
			</Modal.Window>
		</Modal>
	</div>;
}

export default AddCabin;