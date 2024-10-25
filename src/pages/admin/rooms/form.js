import React from "react";
import { useForm } from "react-hook-form";

const RoomForm = ({ defaultValues, onSubmit, isUpdateMode, afterDone }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const handleFormSubmit = (data) => {
    if (isUpdateMode) {
      onSubmit(defaultValues.id, data);
      afterDone();
    } else {
      onSubmit(data);
    }
    reset(); // Reset the form after submission (if adding a new room)
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label>Room Name :</label>
      <input
        type="text"
        {...register("name", { required: true })}
        placeholder="Room Name"
      />

      <label>Room Color :</label>
      <input
        type="color"
        {...register("color", { required: true })}
        placeholder="Room Color"
      />

      <button type="submit">{isUpdateMode ? "Update Room" : "Add Room"}</button>
    </form>
  );
};

export default RoomForm;
