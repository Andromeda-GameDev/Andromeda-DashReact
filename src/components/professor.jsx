import React, {useEffect, useState} from "react";
import {ref, getDatabase, onValue} from "firebase/database";
import { UserAuth } from "../context/AuthContext";
import Sidebar from "./sidebar";
import Card from "./card";
import LeaderboardRow from "./LeaderboardRow";
import HeaderPanel from "../components/headerPanel";

const Professor = () => {

    const {user} = UserAuth();
    const [professorName, setProfessorName] = useState("");
    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [numberOfMatches, setNumberOfMatches] = useState(0);

    
    const getProfessorName = async (professorId) => {
        var full_name = ''
        const database = getDatabase()
        const nameRef = ref(database, `professors/${professorId}/name`)
        const lastNameRef = ref(database, `professors/${professorId}/last_name`)
        onValue(nameRef, (snapshot) => {
            const name = snapshot.val()
            full_name = name 
        })

        onValue(lastNameRef, (snapshot) => {
            const lastName = snapshot.val()
            full_name = full_name + ' ' + lastName
            setProfessorName(full_name)
        })
    }

    const getNumberOfUsers = async () => {
        const database = getDatabase()
        const usersRef = ref(database, 'users/')
        onValue(usersRef, (snapshot) => {
            setNumberOfUsers(Object.keys(snapshot.val()).length)
        })
    }

    const getNumberOfMatches = async () => {
        const database = getDatabase()
        const usersRef = ref(database, 'progress/')
        onValue(usersRef, (snapshot) => {
            setNumberOfMatches(Object.keys(snapshot.val()).length)
        })
    }

    useEffect(() => {
        getProfessorName(user.uid);
        getNumberOfUsers();
        getNumberOfMatches();
    }, [user.uid])


    return (
        <div className="flex bg-gray-100">

            <Sidebar />

            <div className="flex flex-col w-full ml-56">

            <HeaderPanel />

            <div className='w-full px-6 py-6 mx-auto'>
                <div className="w-full bg-indigo-200 shadow-md rounded-lg">
                    <h1 className="text-2xl font-semibold py-5 px-10 pb-3">Hola, {professorName} &nbsp; &#x1F44B;</h1>
                    <p className="text-gray-700 px-10 pb-5"> Échale un ojo a lo que está pasando con tu aplicación hoy </p>
                </div>


                <div className= "flex flex-wrap -mx-3 pt-10">

                    <Card 
                        title="REGISTROS."
                        amount= {numberOfUsers}
                        percentage="+7.8%"
                        icon="bx bx-user"
                        roundedColor="bg-orange-500"
                    />

                    <Card 
                        title="Partidas jugadas"
                        amount={numberOfMatches}
                        percentage="+3.48%"
                        icon="bx bx-user"
                        roundedColor="bg-blue-500"
                    />

                    <Card 
                        title="Usuarios activos"
                        amount="2"
                        percentage="4% conectado"
                        icon="bx bx-user"
                        roundedColor="bg-green-500"
                    />

                </div>
            </div>


            <div className="w-full px-6 py-6 mx-auto">
                <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
                    <header className="px-5 py-4 border-b border-slate-200">
                        <h2 className="font-semibold text-lg"> Leaderboard - Mejores puntajes </h2>
                    </header>

                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                { /* Table header */}
                                <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                                    <tr>
                                        <th className="p-2 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> # </div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap">
                                            <div className="font-semibold text-left"> Nombre </div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Fecha </div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Correo </div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Puntaje </div>
                                        </th>
                                        <th className="p-2 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Matrícula </div>
                                        </th>
                                    </tr>
                                </thead>

                                { /* Table body */}

                                <LeaderboardRow />
                                
                            </table>
                        </div>
                    </div>


                </div>
            </div>

        
    </div>
</div>
      
    )
}

export default Professor;