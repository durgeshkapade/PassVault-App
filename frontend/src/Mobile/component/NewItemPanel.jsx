import React, { useState } from 'react';
import { TbEyeClosed } from "react-icons/tb";
import { RxEyeOpen } from "react-icons/rx";

import axios from 'axios';

function NewItemPanel({ show, onClose,setFilteredItems,setItems }) {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let newPassword = '';
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  async function saveToDB() {

    const item = {
      name: title,
      username: username,
      email: email,
      category: category,
      password: password
    }
    console.log(item);
    await axios.post('http://localhost:8080/', item).then((response) => {
      // console.log(response);
    })

    await axios.get('http://localhost:8080/')
      .then((response) => {
        setItems(response.data)
        setFilteredItems(response.data)

      })
      .catch((error) => {
        console.log(error);
      })

    onClose();


  }

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform transform ${show ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-lg p-6 overflow-auto">

        <button
          onClick={onClose}
          className="text-gray-600 text-2xl hover:text-gray-800 absolute font-bold size-5 top-6 right-7"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold mb-6">Add New Item</h2>

        <div className="space-y-4">


          <div>
            <label className="block bold text-sm  text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              placeholder='Enter Title'
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              placeholder='Enter Username'
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          


          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              value={email}
              placeholder='Enter Email'
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Category ( Ex : Social Media )</label>
            <input
              type="text"
              value={category}
              placeholder='Enter Category'
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="p-3 border border-gray-300 rounded bg-gray-100 hover:bg-gray-200"
              >
                {isPasswordVisible ? <RxEyeOpen /> : <TbEyeClosed />}
              </button>

              <button
                onClick={generatePassword}
                className="py-[9px] px-3 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Generate
              </button>

            </div>
          </div>


        </div>


        <div className="mt-7 flex justify-center">
          <button
            onClick={saveToDB}
            className="px-4 py-2 left-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          >
            Done
          </button>
        </div>


      </div>
    </div>
  );
}

export default NewItemPanel;
