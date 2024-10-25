import React from "react";
import { useForm } from "react-hook-form";

import Loading from "components/Loading";
import { useCrud } from "hooks/useCrud";

const MovieForm = ({ defaultValues, onSubmit, isUpdateMode, afterDone }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues,
  });
  const { data: roomsData, loading } = useCrud("rooms", { name: "" });

  console.log("defaultValues", defaultValues);

  const handleFormSubmit = (data) => {
    if (isUpdateMode) {
      console.log("update data", data);

      onSubmit(defaultValues.id, {
        title: data.title,
        poster_url: data.poster_url,
        show_datetime: data.show_datetime,
        room_id: Number(data.room_id),
      });
      afterDone();
    } else {
      onSubmit(data);
    }
    reset();
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <label>Movie Title</label>
      <input
        type="text"
        name="title"
        placeholder="Movie Title"
        {...register("title", { required: true })}
      />
      <label>Poster URL</label>
      <input
        type="text"
        name="poster_url"
        defaultValue="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg"
        placeholder="Poster URL"
        {...register("poster_url", { required: true })}
      />
      <label>Show Time</label>
      <input
        type="datetime-local"
        name="show_datetime"
        placeholder="Show Time"
        {...register("show_datetime", { required: true })}
      />

      <label>Select a Room</label>
      {roomsData?.length ? (
        <select name="room_id" {...register("room_id", { required: true })}>
          <option value="">Select a Room</option>
          {roomsData.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
      ) : (
        <>
          <a href="/admin/rooms">
            rooms
            <h3>!!!Please Create a room first!!!</h3>
          </a>
        </>
      )}

      <button type="submit">
        {isUpdateMode ? "Update Movie" : "Add Movie"}
      </button>
    </form>
  );
};

export default MovieForm;
