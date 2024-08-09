import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit } from "react-icons/fa";
import {Link} from 'react-router-dom';

function Read() {
  const [error, setError] = useState('');
  const [data, setData] = useState([]);

  async function getData() {
    try {
      const response = await fetch('http://localhost:3500/');
      const result  = await response.json();
      if(response.ok) {
        setData(result);
        setError("");
      } else {
        console.log(result.error);
        setError(result.error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3500/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();
      if (response.ok) {
        // Update the state by filtering out the deleted item
        const updatedData = data.filter(item => item._id !== id);
        setData(updatedData);
        setError("Data deleted successfully");

        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        console.log(result.error);
        setError(result.error);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      setError('Error deleting data');
    }
  };

  console.log('this is data', data);

  return (
    <>
      <div className="flex flex-col gap-2 items-center mt-16">
        <div className="flex space-x-2 md:w-[40rem] sm:w-[30rem] w-[20rem] text-white px-5 py-2 bg-gray-600">
          <span className="w-[30%]">Name</span>
          <span className="w-[50%]">Email</span>
          <span className="w-[10%]">Age</span>
          <span className="w-[10%] flex self-end">Actions</span>
        </div>

        {Array.isArray(data) && data.map((items) => (
          <div key={items._id} className="flex space-x-2 md:w-[40rem] sm:w-[30rem] w-[20rem] text-white px-5 py-2 bg-gray-600">
            <span className="w-[30%]">{items.name}</span>
            <span className="w-[50%]">{items.email}</span>
            <span className="w-[10%]">{items.age}</span>
              <div className="flex space-x-2">
              <button onClick={() => handleDelete(items._id)}><FaTrash /></button>
              <button> <Link to={`/${items._id}`}><FaEdit /></Link> </button> 
              </div>
          </div>
        ))}

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </>
  );
}

export default Read;
