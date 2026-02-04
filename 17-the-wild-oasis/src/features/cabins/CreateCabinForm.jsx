import Input from "../../ui/Input";
import Form from "../../ui/Form.jsx";
import Button from "../../ui/Button.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Textarea from "../../ui/Textarea.jsx";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import useCreateCabin from "./useCreateCabin.js";
import useEditCabin from "./useEditCabin.js";

function CreateCabinForm ({ cabinToEdit = {}, handleCloseModal }) {
	const { isCreating, createCabin } = useCreateCabin();
	const { isEditing, editCabin } = useEditCabin();
	const isWorking = isCreating || isEditing;

	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	function onSuccess () {
		reset();
		handleCloseModal?.();
	}

	function onSubmit (data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (isEditSession) editCabin({ newCabinData: { ...data, image }, id: editId }, { onSuccess });
		else createCabin({ ...data, image }, { onSuccess });
	}

	return <Form onSubmit={handleSubmit(onSubmit)} type={handleCloseModal ? "modal" : "regular"}>
		<FormRow label={"Cabin name"} error={errors?.name?.message}>
			<Input type="text" id="name" disabled={isWorking} {...register("name", {
				required: "This field is required",
			})}/>
		</FormRow>

		<FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
			<Input type="number" id="maxCapacity" disabled={isWorking} {...register("maxCapacity", {
				required: "This field is required",
				min: {
					value: 1,
					message: "Capacity must be at least 1",
				},
			})}/>
		</FormRow>

		<FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
			<Input type="number" id="regularPrice" disabled={isWorking} {...register("regularPrice", {
				required: "This field is required",
				min: {
					value: 0,
					message: "Price cannot be negative",
				},
			})}/>
		</FormRow>

		<FormRow label={"Discount"} error={errors?.discount?.message}>
			<Input type="number" id="discount" defaultValue={0} disabled={isWorking} {...register("discount", {
				required: "This field is required",
				validate: (value, formValues) =>
					+value <= +formValues.regularPrice || "Discount must be less than regular price",
			})}/>
		</FormRow>

		<FormRow label={"Description"} error={errors?.description?.message}>
			<Textarea type="number" id="description" defaultValue="" {...register("description", {
				required: "This field is required",
			})}/>
		</FormRow>

		<FormRow label={"image"}>
			<FileInput id="image" accept="image/*" disabled={isWorking} {...register("image", {
				required: isEditSession ? false : "This field is required",
			})}/>
		</FormRow>

		<FormRow>
			<Button $variation="secondary" type="reset" onClick={() => handleCloseModal?.()}>
				Cancel
			</Button>
			<Button disabled={isWorking}>{isEditSession ? "Edit cabin" : "Create cabin"}</Button>
		</FormRow>
	</Form>;
}

export default CreateCabinForm;
