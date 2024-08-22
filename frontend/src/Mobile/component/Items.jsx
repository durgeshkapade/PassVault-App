import React from 'react'
import { MdOutlineCopyAll } from "react-icons/md";
import { useState ,useEffect} from 'react';
import EditItem from './EditItem'; // Import the Modal component



const Items = ({ item, setFilteredItems, setItems }) => {

  const [showModal, setShowModal] = useState(false);


  const handleOpenPanel = () => {
    setShowModal(true);
  };

  const handleClosePanel = () => {
    setShowModal(false);
  };


  const handleCopyPassword = (e) => {
    e.stopPropagation(); // Prevent the parent div's onClick from firing
    navigator.clipboard.writeText(item.password)
      .then(() => {
        alert('Password copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy password: ', err);
      });
  };


  return (
    <>
        <div className="my-scroll-container relative  border-b-2 flex gap-5 h-[70px]  px-3  font-bold   hover:bg-[#f2f3f4] transition-all 
        duration-150 no-scrollbar  w-full items-center bg-[#ffffff] " onClick={handleOpenPanel}>
          {/* {item.isFavorite ? <div className='absolute top-1  text-xs'>⭐</div> : ''} */}

          <div className="w-12 overflow-hidden object-cover object-center  rounded-xl ">   
            <img  src={item.logo } ></img>
          </div>

          <div className="flex flex-col justify-center gap-1 overflow-hidden  ">
            <h3 className="text-base font-bold  text-[#323232] ">{item.name}</h3>
            <div className="flex">
              <p className="text-sm font-semibold  text-nowrap opacity-55">{item.email}</p>
            </div>
          </div>

          <div className="absolute right-3  ">
            <button onClick={handleCopyPassword}>
            <MdOutlineCopyAll size={18} color='#434343' />
            </button>
          </div>

        </div>
    
    
        
        <EditItem show={showModal} onClose={handleClosePanel} item={item} setFilteredItems={setFilteredItems} setItems={setItems} />

    </>
  )
}

export default Items



