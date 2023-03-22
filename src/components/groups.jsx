import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Sidebar from "../components/sidebar";
import "ka-table/style.css";

import ClassTable from "../components/ClassTable";
import { equalTo, getDatabase, orderByChild, query, get, ref, child, set, push, remove } from "firebase/database";
import Modal from "../components/ModalRegisterGroup";

function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const Groups = () => {


    const { user } = UserAuth();

    const [professorGroups, setProfessorGroups] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [didAddedGrouo, setDidAddedGroup] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveModal = (value) => {
        console.log('Input value:', value);
        const db = getDatabase();
        const ref_prof_groups = push(ref(db, `professors/${user.uid}/groups/`));
        set(ref_prof_groups, {
            Id: generateRandomString(), 
            name: value
        });
        setDidAddedGroup(!didAddedGrouo);
        setIsModalOpen(false);
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    
    };
    const handleDeleteGroupButton = (groupKey) => {
        const db = getDatabase();
        const ref_prof_groups = ref(db, `professors/${user.uid}/groups/${groupKey}`);
        remove(ref_prof_groups);
        setDidAddedGroup(!didAddedGrouo);
    };

    useEffect(() => {

        const db = getDatabase();

        
        // Getting the data
        get(child(ref(db),  `professors/${user.uid}/groups/`)).then((snapshot) => {
            const dataObj = snapshot.val() || {};
            const dataArray = Object.keys(dataObj).map(key => ({ 
                Id: dataObj[key].Id,
                name: dataObj[key].name,
                key: key
            }));
            console.log(dataArray);
            setProfessorGroups(dataArray);
        });


    }, [user, didAddedGrouo]);

    
    return (
        <div className="flex bg-gray-100">
            <div className="flex">
                <Sidebar />
            </div>
            <div>
                <div className="flex flex-row justify-between items-center">
                    <p className="pl-5">Grupos</p>
                    <div className="pr-5">
                        <button className='border border-blue-500 bg-blue-500 text-white px-6 py-2 my-4' onClick={handleOpenModal}> Agregar Grupo</button>
                    </div>
                </div>
                <div className="h-screen overflow-y-auto">
                    {professorGroups.map(group => (
                        <ClassTable key={group.Id} Id={group.Id} nm={group.name} delHandler={handleDeleteGroupButton} gKey={group.key}/>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <Modal
                title="Agregar Grupo"
                onClose={handleCloseModal}
                onSave={handleSaveModal}
                inputValue={inputValue}
                onInputChange={handleInputChange}
                />
            )}
        </div>
    );

}


export default Groups;