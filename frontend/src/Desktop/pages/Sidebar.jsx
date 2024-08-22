// Sidebar.js
import React, { useState } from 'react';
import icon from '../assets/icon.svg'
import './homepage.css'
import { items } from './items';
import axios from 'axios';
import generatePassword from './PasswordGenerator';
import Modal from './Modal';

const getElementsOfCategories = (data, categories) => {
    return data.filter(item => categories.includes(item.category));
};

const getFavoriteElements = (data) => {
    return data.filter(item => item.isFavorite);
};

const getElementsOfType = (data, type) => {
    return data.filter(item => item.type === type);
};

function getCategories(data) {
    const uniqueCategories = [...new Set(data.map(item => item.category))];
    return uniqueCategories;
}

function SideItem({ data, icon, title, func, isf }) {
    return <div className='flex items-center gap-3 my-4 opacity-80 hover:opacity-100 hover:cursor-pointer' onClick={() => { isf ? func(getFavoriteElements(data)) : func(getElementsOfType(data, title)) }}>
        <span>{icon}</span>
        <span>{title}</span>
    </div>
}

function SideCategory({ data, title, icon, cat, func }) {
    return <div className='flex items-center'>
        <div className='flex items-center gap-3 w-40 px-2 py-2 opacity-80 hover:opacity-100 hover:cursor-pointer rounded-md hover:bg-blue-500 hover:text-white dark:hover:bg-slate-700 transition-all duration-200' onClick={() => { func(getElementsOfCategories(data, cat)) }}>
            <span>{icon}</span>
            <span>{title}</span>
        </div>
    </div>
}

const Sidebar = ({ data, curr, setRowItems }) => {
    const [modalShow, setModalShow] = useState(false);

    const handleModalClose = () => setModalShow(false);
    const handleModalShow = () => setModalShow(true);

    const [itemName, setItemName] = useState();
    const [itemPassword, setItemPassword] = useState();
    const [itemEmail, setItemEmail] = useState();
    const [itemUsername, setItemUsername] = useState();
    const [itemUrl, setItemUrl] = useState();
    const [itemCategory, setItemCategory] = useState();

    const saveItem = async () => {
        const item = {
            name: itemName,
            site: itemUrl,
            email: itemEmail,
            username: itemUsername,
            password: itemPassword,
            category: itemCategory
        };
        await axios.post('http://localhost:8080/', item).then((response) => {
            console.log(response);
        });

        await axios.get('http://localhost:8080/')
            .then((response) => {
                setData(response.data)
                setRowItems(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
        handleModalClose();
    };

    return (
        <aside className="border-r-2 dark:border-0 border-gray-300 bg-[#262835] h-full text-white w-96 p-8 flex flex-col transition-all duration-300">
            <div className="flex items-center mb-8">
                <img className='w-6 mr-3' src={icon} alt="Icon" />
                <span className="text-2xl font-bold">Vault</span>
            </div>
            <nav className="flex-1 transition-all duration-200">
                <SideItem icon="🏠" title="Logins" isf={false} func={curr} />
                <SideItem icon="💳" title="Credit Cards" isf={false} func={curr} />
                <SideItem icon="📝" title="Notes" isf={false} func={curr} />
                <SideItem icon="⭐" title="Favorites" isf={true} func={curr} data={data} />

                {/* Categories */}
                <div className="mt-9">
                    <p className="m-3 p-2 text-lg font-semibold">Categories</p>
                    <div className='flex items-center'>
                        <div className='flex items-center gap-3 w-40 px-2 py-2 opacity-80 hover:opacity-100 hover:cursor-pointer rounded-md hover:bg-blue-500 hover:text-white dark:hover:bg-slate-700 transition-all duration-200' onClick={() => { func(getElementsOfCategories(data, cat)) }}>
                            <span>•</span>
                            <span>All</span>
                        </div>
                    </div>
                    {getCategories(data).map((category, index) => {
                        return <SideCategory data={data} icon="•" title={category} key={index} cat={category} func={curr} />
                    })}
                </div>
            </nav>

            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 mt-6 rounded" onClick={handleModalShow}>New item +</button>

            <Modal
                show={modalShow}
                handleClose={handleModalClose}
                handleSave={saveItem}
                setItemName={setItemName}
                setItemCategory={setItemCategory}
                setItemUrl={setItemUrl}
                setItemEmail={setItemEmail}
                setItemUsername={setItemUsername}
                itemPassword={itemPassword}
                setItemPassword={setItemPassword}
                generatePassword={generatePassword}
            />
        </aside>
    );
};

export default Sidebar;
