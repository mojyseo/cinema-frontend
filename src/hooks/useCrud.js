import { useState, useEffect } from "react";
import axios from "lib/axios";
import { toast } from "react-toastify";

// Custom Hook for CRUD operations for different entities
export const useCrud = (entityName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/${entityName}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  // READ
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  // CREATE
  const handleAdd = async (formValues) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/${entityName}`,
        formValues
      );
      setData([...data, response.data]);
      toast.success(`${entityName.slice(0, -1)} added successfully.`);
    } catch (error) {
      console.error("Error adding data:", error);
    }
    setLoading(false);
  };

  // UPDATE
  const handleUpdate = async (id, formValues) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/${entityName}/${id}`,
        formValues
      );
      const updatedData = data.map((item) =>
        item.id === id ? response.data : item
      );
      setData(updatedData);
      toast.success(`${entityName.slice(0, -1)} Updated Successfully.`);
    } catch (error) {
      console.error("Error updating data:", error);
    }
    setLoading(false);
  };

  // DELETE
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/${entityName}/${id}`
      );
      setData(data.filter((item) => item.id !== id));
      toast.success(`${entityName.slice(0, -1)} Deleted Successfully.`);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    setLoading(false);
  };

  return {
    data,
    loading,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};
