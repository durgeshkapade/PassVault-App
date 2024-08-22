import React, { useEffect, useState } from 'react'
import { IoMdAddCircleOutline, IoIosSearch } from 'react-icons/io'
import { FaSearch } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import Vault from './component/Vault'
import { IoSearchOutline } from 'react-icons/io5'

import NewItemPanel from './component/NewItemPanel';
import axios from 'axios';



const App = () => {

  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState("");


  const [showPanel, setShowPanel] = useState(false);

  const handleOpenPanel = () => {
    setShowPanel(true);
  };

  const handleClosePanel = () => {
    setShowPanel(false);
  };

  useEffect(() => {
    getPasswords();
  }, [])

  async function getPasswords() {
    await axios.get('http://localhost:8080/')
      .then((response) => {
        console.log(response.data);
        setItems(response.data)
        setFilteredItems(response.data)

      })
      .catch((error) => {
        console.log(error);
      })
  }


  return (

    <div className="w-screen h-screen bg-[#f7f8fa]  flex flex-col relative" >

      {/* Header rounded-b-3xl bg-[#209761] 97a7f9*/}
      <div className="bg-[#0572ec] p-3 pb-9 shadow-2xl  relative py-5 ">

        <div className="User-Name rounded-md border-black w-full h-[40px] text-xl text-white items-center p-2 flex justify-between font-bold">
          PassVault
          <button
          // onClick={() => setShowModal(true)}
          ><IoIosLock size={30} /> </button>

        </div>

        {/*  Search Bar */}
        <div className='w-[94%] border-2 shadow-md border-gray-200 rounded-xl overflow-hidden flex items-center justify-between absolute mt-3'>

          <input type='text' value={searchText} className='h-10 w-5/6 px-3 bg-white outline-none' placeholder='Search items'
            onChange={(e) => {
              setSearchText(e.target.value)

              let filterItems = items.filter(
                (i) => i.name.toLowerCase().includes(searchText.toLowerCase())
              )

              setFilteredItems(filterItems);

            }}
          />


          <button className='w-1/6 h-10 bg-slate-200' onClick={() => {

            let filterItems = items.filter(
              (i) => i.name.toLowerCase().includes(searchText.toLowerCase())
            )

            setFilteredItems(filterItems);

          }}>
            <FaSearch className='ml-6' size={17} color='#333333' />
          </button>


        </div>


      </div>


      <Vault datag={filteredItems} setFilteredItems={setFilteredItems} items={items} setItems={setItems} />



      {/* Add new item */}
      <div className="p-4 absolute bottom-12 right-2">
        <button
          onClick={handleOpenPanel}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600"
        >
          + New Item
        </button>

        <NewItemPanel show={showPanel} onClose={handleClosePanel} setFilteredItems={setFilteredItems} setItems={setItems} />
      </div>


    </div>
  )
}


export default App