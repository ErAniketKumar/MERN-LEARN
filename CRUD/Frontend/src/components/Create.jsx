import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    const data = {
      name: name,
      email: email,
      age: age,
    };

    try {
      const response = await fetch('http://localhost:3500/', {
        method: 'POST',
        body: JSON.stringify(data), 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      if (response.ok) {
        navigate('/all'); // Replace '/success' with your desired route
      } else {
        console.error('Error saving data:', result);
      }
    } catch (error) {
      console.error('Network error:', error);
    }

    setName('');
    setEmail('');
    setAge('');
  };

  return (
    <div className="mt-10">
      <div className="flex w-full justify-center">
        <form onSubmit={submitHandler} className="flex flex-col bg-pink-500 p-10 mt-5 text-white rounded-lg">
          <p className="text-center text-lg font-semibold pb-4">Enter Data</p>
          <label htmlFor="name">Name</label>
          <input
            className="outline-none bg-gray-600 px-2 py-1"
            type="text"
            name='name'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            className="outline-none bg-gray-600 px-2 py-1"
            type="email"
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="age">Age:</label>
          <input
            className="outline-none bg-gray-600 px-2 py-1"
            type="text"
            name='age'
            id='age'
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <button className="bg-green-700 py-2 rounded mt-2 hover:bg-blue-500" type='submit'>Add</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
