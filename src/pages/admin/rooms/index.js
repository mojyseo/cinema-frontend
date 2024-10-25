import React, { useState } from "react";

import { useCrud } from "hooks/useCrud";
import Form from "pages/admin/rooms/form";
import Modal from "components/Modal";
import Loading from "components/Loading";
import Container from "components/containers/AdminContainer";

const Rooms = () => {
  const initialFields = { name: "", color: "" };
  const { data, handleAdd, handleUpdate, handleDelete, loading } = useCrud(
    "rooms",
    initialFields
  );

  const [updateModalData, setUpdateModalData] = useState(false);
  const handleUpdateModalOpen = (roomData) => {
    setUpdateModalData(roomData);
  };
  const handleUpdateModalClose = () => {
    setUpdateModalData(false);
  };

  return (
    <Container>
      <div>
        <h2>Create New Room :</h2>
        <Form
          defaultValues={initialFields}
          onSubmit={handleAdd}
          isUpdateMode={false}
        />
      </div>

      <div>
        <h2>Rooms List :</h2>
        {loading ? (
          <Loading />
        ) : (
          <ul>
            {data?.length ? (
              data.map((room) => (
                <li key={room.id}>
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      background: room.color,
                      marginRight: 6,
                    }}
                  ></div>
                  {room.name}
                  <button onClick={() => handleUpdateModalOpen(room)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(room.id)}>Delete</button>
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

export default Rooms;
