import Input from "../../ui/Input";
import Form from "../../ui/Form.jsx";
import Button from "../../ui/Button.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Textarea from "../../ui/Textarea.jsx";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";

function CreateCabinForm () {
	const { register, handleSubmit, reset, formState: { errors } } = useForm();
	const queryClient = useQueryClient();
	const { mutate, isPending: isCreating } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] })
				.then(() => toast.success("New cabin successfully created"))
				.then(() => reset());
		},
		onError: error => toast.error(error.message),
	});

	function onSubmit (data) {
		mutate(data);
	}

	return <Form onSubmit={handleSubmit(onSubmit)}>
		<FormRow label={"Cabin name"} error={errors?.name?.message}>
			<Input type="text" id="name" disabled={isCreating} {...register("name", {
				required: "This field is required",
			})}/>
		</FormRow>

		<FormRow label={"Maximum capacity"} error={errors?.maxCapacity?.message}>
			<Input type="number" id="maxCapacity" disabled={isCreating} {...register("maxCapacity", {
				required: "This field is required",
				min: {
					value: 1,
					message: "Capacity must be at least 1",
				},
			})}/>
		</FormRow>

		<FormRow label={"Regular Price"} error={errors?.regularPrice?.message}>
			<Input type="number" id="regularPrice" disabled={isCreating} {...register("regularPrice", {
				required: "This field is required",
				min: {
					value: 0,
					message: "Price cannot be negative",
				},
			})}/>
		</FormRow>

		<FormRow label={"Discount"} error={errors?.discount?.message}>
			<Input type="number" id="discount" defaultValue={0} disabled={isCreating} {...register("discount", {
				required: "This field is required",
				validate: (value, formValues) =>
					+value <= +formValues.regularPrice || "Discount must be less than regular price",
			})}/>
		</FormRow>

		<FormRow label={"Description"} error={errors?.description?.message}>
			<Textarea type="number" id="description" defaultValue="" disabled={isCreating} {...register("description", {
				required: "This field is required",
			})}/>
		</FormRow>

		<FormRow label={"image"}>
			<FileInput id="image" accept="image/*" disabled={isCreating}/>
		</FormRow>

		<FormRow>
			<Button variation="secondary" type="reset">
				Cancel
			</Button>
			<Button disabled={isCreating}>Edit cabin</Button>
		</FormRow>
	</Form>;
}

export default CreateCabinForm;
