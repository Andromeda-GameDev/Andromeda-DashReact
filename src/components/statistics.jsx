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
    const [downloadData, setDownloadData] = useState([]);

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

    function get_students_progress(studentProgress, group, student) {
        const levels = Object.keys(studentProgress);
        const studentsProgress = levels.map((level) => {
            const sections = Object.keys(studentProgress[level]);
            const sectionData = sections.map((section) => {
                return {
                    section: section,
                    added: studentProgress[level][section].added,
                    attempts: studentProgress[level][section].attempts,
                    score: studentProgress[level][section].score,
                    time: studentProgress[level][section].time,
                };
            });
            const levelData = sectionData.reduce(
                (accumulator, currentValue) => {
                    accumulator.added += currentValue.added;
                    accumulator.attempts += currentValue.attempts;
                    accumulator.score += currentValue.score;
                    accumulator.time += currentValue.time;
                    return accumulator;
                },
                { added: 0, attempts: 0, score: 0, time: 0 }
            );
            return {
                id: student.id,
                name: student.name + " " + student.last_name,
                group: group,
                email: student.email,
                level: level,
                ...sections.reduce((accumulator, currentValue, index) => {
                    accumulator[`section_${index + 1}_added`] = sectionData[index].added;
                    accumulator[`section_${index + 1}_attempts`] = sectionData[index].attempts;
                    accumulator[`section_${index + 1}_score`] = sectionData[index].score;
                    accumulator[`section_${index + 1}_time`] = sectionData[index].time;
                    return accumulator;
                }, {}),
            };

        });
        return studentsProgress;
    }


    const getAllData = () => {
        const database = getDatabase();
        const progressRef = ref(database, 'progress');
        const usersRef = ref(database, 'users');
        const professorsRef = ref(database, 'professors');

        const studentsProgress = [];

        onValue(progressRef, (progressSnapshot) => {
            const progress = progressSnapshot.val();
            onValue(usersRef, (usersSnapshot) => {
                const users = usersSnapshot.val();
                onValue(professorsRef, (professorsSnapshot) => {
                    const professors = professorsSnapshot.val();
                    for(let studentId in progress) {
                        const student = users[studentId];
                        const group = professors[student.group]?.groups?.[student.group]?.name ?? "Sin grupo";
                        const studentProgress = get_students_progress(progress[studentId], group, student);
                        studentsProgress.push(...studentProgress);
                    }
                    setDownloadData(studentsProgress);
                });
            });
        });
    }


    const handleSelectedOptionChange = (option) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        getAllData();
        console.log("downloadData")
        console.log(JSON.stringify(downloadData))
    }, []);

    return (

        <div className="flex bg-gray-100 min-h-screen">

            <Sidebar />

            <div className="flex flex-col w-full ml-56">

            <HeaderPanel />

            { /* Add button to the top left */}
            
            <div className="flex pt-5 pr-9">
                <div className="ml-8"> 
                <DropdownComponent assignedGroups={getProfessorGroups()} onSelectedOption={handleSelectedOptionChange} />
                </div>

                <CSVLink data={downloadData} filename={"estadisticas_generales.csv"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-auto">
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