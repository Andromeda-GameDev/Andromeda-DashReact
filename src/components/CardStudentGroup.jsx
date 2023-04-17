import React, { useState } from "react";
import ModalRemoveFromGroup from "./ModalRemoveFromGroup";
import { getDatabase, ref, set } from "firebase/database";

const CardStudentNoGroup = ({methodGetIntoGroup, the_user_id}) =>{

    const [newGroup, setNewGroup] = useState("");

    const handleGetIntoGroup = () => {
        const db = getDatabase();
        const userGroupRef = ref(db, `users/${the_user_id}/group`)
        set(userGroupRef, newGroup)
        .then(() => {
            console.log("Group value updated successfully!");
            methodGetIntoGroup(newGroup);
            setNewGroup("")
            })
            .catch((error) => {
            console.error("Error updating group value:", error);
            });
    }
    const handleChangedInputGroup = (event) => {
        setNewGroup(event.target.value);
    }

    return(
        <div className="w-2/5 h-40 wrelative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="h-1/2 flex flex-col justify-center">
                <h1 className="text-left text-bs font-bold pl-5">Unete a un grupo</h1>
            </div>
            <div className="h-1/2">
                <div className="flex flex-row justify-between">
                    <label className="py-2 pl-5 font-bs">ID</label>
                    <input type="text" className="border p-1" value={newGroup} onChange={handleChangedInputGroup}/>
                    <div className="pr-5">
                        <button onClick={handleGetIntoGroup} className="h-10 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700">
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    ); 
}

const CardStudentGroup = ({name_group, id_group, the_user_id, methodDeleteGroup}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleExitGroup = () => {
        const db = getDatabase();
        const userGroupRef = ref(db, `users/${the_user_id}/group`);

        // Update the user's "group" field with the new value
        set(userGroupRef, "")
        .then(() => {
            methodDeleteGroup();
        console.log("Group value updated successfully!");
        })
        .catch((error) => {
        console.error("Error updating group value:", error);
        });
        setIsModalOpen(false);
    };


    return (
        <div className="w-2/5 h-40 wrelative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="flex flex-col h-5/6 justify-center">
                <div className="pl-4">
                    <p> <span className="font-bold">Grupo: </span> { name_group } </p>
                    <p> <span className="font-bold">ID: </span> {id_group} </p>
                </div>
            </div>
            <div className="flex h-full justify-end items-center pr-4">
                <button onClick={handleOpenModal} className="h-10 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-700">
                    Delete
                </button>
            </div>

            {isModalOpen && (
                <ModalRemoveFromGroup onClose={handleCloseModal} onDelete={handleExitGroup} /> 
            )}

        </div>
    );
};
export {CardStudentGroup, CardStudentNoGroup};