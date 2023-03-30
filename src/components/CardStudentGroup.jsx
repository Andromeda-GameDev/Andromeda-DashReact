import React from "react";

const CardStudentGroup = ({name_group, id_group}) => {
    return (
        <div className="w-2/5 h-40 wrelative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
            <div className="flex flex-col h-5/6 justify-center">
                <div className="pl-4">
                    <p> <span className="font-bold">Grupo: </span> { name_group } </p>
                    <p> <span className="font-bold">ID: </span> {id_group} </p>
                </div>
            </div>
            <div className="flex h-full justify-end items-center pr-4">
                <button className="h-10 px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-700">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CardStudentGroup;