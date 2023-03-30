import React, { useEffect, useState }from "react";
import Sidebar from "../components/sidebar";
import GeneralStatsRow from "../components/GeneralStatsRow";
import { CSVLink } from "react-csv";
import DropdownComponent from "../components/DropdownComponent";
import HeaderPanel from "../components/headerPanel";
import { UserAuth } from "../context/AuthContext";
import {ref, getDatabase, onValue, get} from "firebase/database";

const Statistics = () => {

    const {user} = UserAuth();
    const [table_progress, setTableProgress] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");

    const getProfessorGroups = () => {
        const database = getDatabase();
        const userRef = ref(database, 'professors/' + user.uid + '/groups');
        const profGroups = []
        
        onValue(userRef, (snapshot) => {
            const groups = snapshot.val();
            for(let group in groups) {
                profGroups.push(groups[group].name);
            }

            profGroups.push("General")

        });
        
        //setGroups(profGroups);
        return profGroups;
    }

    const handleSelectedOptionChange = (option) => {
        setSelectedOption(option);
    };

    return (

        <div className="flex bg-gray-100">

            <Sidebar />

            <div className="flex flex-col w-full ml-56">

            <HeaderPanel />

            { /* Add button to the top left */}
            
            <div className="flex pt-5 pr-9">
                <div className="ml-8"> 
                <DropdownComponent assignedGroups={getProfessorGroups()} onSelectedOption={handleSelectedOptionChange} />
                </div>

                <CSVLink data={table_progress} filename={"estadisticas_generales.csv"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-auto"> 
                    Descargar CSV 
                </CSVLink>
            </div>


            <div className="flex flex-wrap p-5">
                
                <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200 flex-1">
                    <header className="px-5 py-4 border-b border-slate-200">
                        <h2 className="font-semibold text-lg"> Progreso general de los alumnos </h2>
                    </header>

                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                { /* Table header */}
                                <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                                    <tr>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> ID </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap">
                                            <div className="font-semibold text-left"> Nombre </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Grupo </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Matrícula </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Sección 1 </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Sección 2 </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Sección 3 </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Sección 4 </div>
                                        </th>
                                        
                                        
                                    </tr>
                                </thead>

                                { /* Table body */}

                               <GeneralStatsRow option={{selectedOption}} setData={setTableProgress} />
                                
                            </table>
                        </div>
                    </div>
                   
                </div>
                
            </div>

            </div>
        </div>

    )
    

}

export default Statistics;