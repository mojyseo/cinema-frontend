import React, { useState } from "react";

import { useCrud } from "hooks/useCrud";
import Form from "pages/admin/movies/form";
import Modal from "components/Modal";
import Loading from "components/Loading";
import Container from "components/containers/AdminContainer";

const initialFields = {
  title: "",
  poster_url:
    "https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p10543523_p_v8_as.jpg",
  show_datetime: "",
  room_id: "",
};
const Movies = () => {
  const { data, handleAdd, handleUpdate, handleDelete, loading } = useCrud(
    "movies",
    initialFields
  );

  const [updateModalData, setUpdateModalData] = useState(false);

  const handleUpdateModalOpen = (movieData) => {
    setUpdateModalData(movieData);
  };
  const handleUpdateModalClose = () => {
    setUpdateModalData(false);
  };

  // Fetch rooms data for the dropdown

  return (
    <Container>
      <div>
        <h2>Create New Movie :</h2>
        <Form
          defaultValues={initialFields}
          onSubmit={handleAdd}
          isUpdateMode={false}
        />
      </div>

      <div>
        <h2>Movies List :</h2>
        {loading ? (
          <Loading />
        ) : (
          <ul>
            {data?.length ? (
              data.map((movie) => (
                <li key={movie.id}>
                  {movie.title} - {movie.show_datetime} - Room:{" "}
                  {movie.room.name}
                  <button onClick={() => handleUpdateModalOpen(movie)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(movie.id)}>Delete</button>
                </li>
              ))
            ) : (
              <h4>No Movies Added yet!</h4>
            )}
          </ul>
        )}
      </div>

      <div>
        <Modal isOpen={!!updateModalData} onClose={handleUpdateModalClose}>
          <Form
            defaultValues={updateModalData}
            onSubmit={handleUpdate}
            isUpdateMode={true}
            afterDone={handleUpdateModalClose}
          />
        </Modal>
      </div>
    </Container>
  );
};

export default Movies;
