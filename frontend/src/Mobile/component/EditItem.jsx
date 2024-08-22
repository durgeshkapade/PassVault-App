import { useState, useEffect } from 'react';
import React from 'react';
import { TbEyeClosed } from "react-icons/tb";
import { RxEyeOpen } from "react-icons/rx";
import './EditItem.css'; // Import the CSS for animations
import axios from 'axios';

function EditItem({ show, onClose, item, setItems, setFilteredItems }) {

  const [name, setName] = useState(item?.name || '');
  const [username, setUsername] = useState(item?.username || '');
  const [email, setEmail] = useState(item?.email || '');
  const [category, setCategory] = useState(item?.category || '');
  const [password, setPassword] = useState(item?.password || '');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setName(item?.name || '');
    setUsername(item?.username || '');
    setEmail(item?.email || '');
    setCategory(item?.category || '');
    setPassword(item?.password || '');
  }, [item]);

  // console.log(item);


  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let newPassword = '';
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  const handleUpdate = async () => {
    const id = item._id;

    await axios.put(`http://localhost:8080/${id}`, {
      name: name,
      username: username,
      email: email,
      category: category,
      password: password,
      lastModified: Date.now()

    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
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





  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">

      <div className={`bg-white rounded-t-lg shadow-lg w-full max-w-md p-6 relative transition-transform duration-300 ease-out ${show ? 'slide-up' : 'slide-down'}`}>

        <button
          onClick={onClose}
          className="text-gray-600 text-2xl hover:text-gray-800 absolute top-7 right-7"
        >
          &times;
        </button>



        <div className="flex items-center mb-4">
          {item?.logo && (
            <img src={item.logo} alt={item.title} className="w-12 h-12" />
          )}
          {/* <h2 className="text-xl font-semibold ml-2">Edit Item</h2> */}
        </div>



        <div className="space-y-4">

          <div>
            <label className="block text-sm text-gray-700">Title</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>


          <div>
            <label className="block text-sm text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>



          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-100 text-black rounded-md p-2 mt-1"
            />
          </div>


          <div>
            <label className="block text-sm text-gray-700">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-100 rounded-md p-2 mt-1"
            />
          </div>


          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <div className="flex items-center space-x-2">

              <input
                type={isPasswordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 rounded-md p-2 mt-1"
              />

              <button
                className="bg-gray-200 text-black px-3 py-[11px] rounded"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <RxEyeOpen /> : <TbEyeClosed />}
              </button>

              <button
                className="bg-blue-500 text-white px-2 py-2 rounded"
                onClick={generatePassword}
              >
                Generate
              </button>

            </div>
          </div>


        </div>


        <div className="mt-4 flex justify-between">
          <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">
            Done
          </button>
        </div>


      </div>
    </div>
  );
}

export default EditItem;









// import React from 'react';
// import './CreateItem.css'; // Import the CSS for animations

// function CreateItem({ show, onClose, item }) {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
//       <div className={`bg-white rounded-t-lg shadow-lg w-full max-w-md p-6 relative transition-transform duration-300 ease-out ${show ? 'slide-up' : 'slide-down'}`}>
//         <button
//           onClick={onClose}
//           aria-label="Close modal"
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//         >
//           &times;
//         </button>
//         <div className="flex items-center mb-4">
//           <div className="bg-green-500 text-white p-2 px-4 rounded-full">
//             <span className="font-bold">{item ? 'Edit item' : 'Create item'}</span>
//           </div>
//           <h2 className="text-xl font-semibold ml-2">{item?.title || 'New Item'}</h2>
//         </div>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-700">Title</label>
//             <input
//               type="text"
//               value={item?.title || ''}
//               readOnly
//               className="w-full bg-gray-100 rounded-md p-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700">Category</label>
//             <input
//               type="text"
//               value={item?.category || ''}
//               readOnly
//               className="w-full bg-gray-100 rounded-md p-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700">Login URL</label>
//             <input
//               type="text"
//               value={item?.loginUrl || ''}
//               readOnly
//               className="w-full bg-gray-100 rounded-md p-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700">Password</label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="password"
//                 value="********"
//                 readOnly
//                 className="w-full bg-gray-100 rounded-md p-2 mt-1"
//               />
//               <button
//                 className="bg-blue-500 text-white px-2 py-1 rounded"
//                 onClick={() => {
//                   // Add your password generation logic here
//                   alert("Generate new password");
//                 }}
//               >
//                 Generate
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="mt-4 flex justify-between">
//           <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded">
//             Done
//           </button>
//           <button className="bg-red-500 text-white px-4 py-2 rounded">
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateItem;
