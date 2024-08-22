import React from 'react'
import { useState, useEffect } from 'react'
import { Category } from './Category'
import Items from './Items'



const Vault = ({ datag, setFilteredItems, items, setItems }) => {

  const [data, setData] = useState(datag);

  // Use useEffect to respond to prop changes if necessary
  useEffect(() => {
    setData(datag);
  }, [datag]); // Re-run the effect if props.data changes

  function getUniqueCategories() {
    const uniqueCategories = [...new Set(datag.map(item => item.category))];

    uniqueCategories.push("All");
    uniqueCategories.reverse();
    return uniqueCategories;
  }

  // const [categories, setCategories] = useState(["All", "Social media", "Streaming", "Mobile", "Mobile streaming", "business", "banking"])
  const [categories, setCategories] = useState(getUniqueCategories(data))

  useEffect(() => {
    setCategories(getUniqueCategories(data));
  }, [data]);

  console.log(categories);



  return (
    <div className="vault h-full rounded-md flex flex-col gap-2 overflow-y-hidden p-3 mt-5">
      <h2 className='text-xl font-bold text-[#606467]'>categories</h2>

      <div className="  py-2 flex overflow-hidden overflow-x-auto gap-2  h-[70px]">
        {
          categories.map((c, index) => <Category item={c} func={setData} key={index} />)
        }
      </div>

      <div className="items h-screen overflow-y-auto border-t-2">
        {
          data.map((i, index) => <Items key={index} item={i} setFilteredItems={setFilteredItems} setItems={setItems} />
          )
        }
      </div>



    </div>
  )
}




export default Vault;

