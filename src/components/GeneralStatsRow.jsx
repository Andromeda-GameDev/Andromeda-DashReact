import React, {useEffect, useState} from "react";
import {ref, getDatabase, get } from "firebase/database";

const GeneralStatsRow = ({option, setData}) => {
    const [data, setInfo] = useState([]);

    const groupNames = {
        'Grupo B': '23df3f',
        'Grupo C': 'KHsS1HC',
        'Grupo G': 'CXtspPE',
        'General' : 'all',
    }

    const groupCodes = {
        '23df3f': 'Grupo B',
        'KHsS1HC': 'Grupo C',
        'CXtspPE': 'Grupo G',
        'all' : 'General',
    }
    
    const groupName = groupNames[option.selectedOption]; 

    useEffect(() => {
        const fetchData = async () => {
            const database = getDatabase();
            const usersRef = ref(database, 'users/');
            const snapshot = await get(usersRef);
            const users = snapshot.val();
            const usersArray = [];

            if(groupName === 'all' || groupName === undefined){
                for (let userId in users) {
                    if(users[userId].group in groupCodes){
                        usersArray.push(
                            {
                                id: 0,
                                name: users[userId].name + ' ' + users[userId].last_name,
                                group: groupCodes[users[userId].group],
                                mat: users[userId].email.split('@')[0],
                                secOneT: 0,
                                secOneS: 0,
                                secOneY: 0,
                                secTwoT: 0,
                                secTwoS: 0,
                                secTwoY: 0,
                                secThreeT: 0,
                                secThreeS: 0,
                                secThreeY: 0,
                                secFourT: 0,
                                secFourS: 0,
                                secFourY: 0,
                            }
                        )
                    }
                }
    
                const progressRef = ref(database, 'progress/');
                const progressSnapshot = await get(progressRef);
                const progress = progressSnapshot.val();
                for (let userId in progress){
                    for (let i = 0; i < usersArray.length; i++){

                        usersArray[i].id = i + 1;

                        if(usersArray[i].mat === users[userId].email.split('@')[0]){
                            usersArray[i].secOneT = progress[userId].level_1.section_1.score;
                            usersArray[i].secOneS = progress[userId].level_1.section_1.time;
                            usersArray[i].secOneY = progress[userId].level_1.section_1.attempts;
    
                            usersArray[i].secTwoT = progress[userId].level_1.section_2.score;
                            usersArray[i].secTwoS = progress[userId].level_1.section_2.time;
                            usersArray[i].secTwoY = progress[userId].level_1.section_2.attempts;
    
                            usersArray[i].secThreeT = progress[userId].level_1.section_3.score;
                            usersArray[i].secThreeS = progress[userId].level_1.section_3.time;
                            usersArray[i].secThreeY = progress[userId].level_1.section_3.attempts;
    
                            usersArray[i].secFourT = progress[userId].level_1.section_4.score;
                            usersArray[i].secFourS = progress[userId].level_1.section_4.time;
                            usersArray[i].secFourY = progress[userId].level_1.section_4.attempts;
                        }
                    }
                }

            }else{
                for (let userId in users) {
                    if(users[userId].group === groupName){
                        usersArray.push(
                            {
                                id: 0,
                                name: users[userId].name + ' ' + users[userId].last_name,
                                group: option.selectedOption,
                                mat: users[userId].email.split('@')[0],
                                secOneT: 0,
                                secOneS: 0,
                                secOneY: 0,
                                secTwoT: 0,
                                secTwoS: 0,
                                secTwoY: 0,
                                secThreeT: 0,
                                secThreeS: 0,
                                secThreeY: 0,
                                secFourT: 0,
                                secFourS: 0,
                                secFourY: 0,
                            }
                        )
                    }
                }
    
                const progressRef = ref(database, 'progress/');
                const progressSnapshot = await get(progressRef);
                const progress = progressSnapshot.val();
                for (let userId in progress){
                    if(users[userId].group === groupName){
                        for (let i = 0; i < usersArray.length; i++){

                            usersArray[i].id = i + 1;

                            if(usersArray[i].mat === users[userId].email.split('@')[0]){
                                usersArray[i].secOneT = progress[userId].level_1.section_1.score;
                                usersArray[i].secOneS = progress[userId].level_1.section_1.time;
                                usersArray[i].secOneY = progress[userId].level_1.section_1.attempts;
    
                                usersArray[i].secTwoT = progress[userId].level_1.section_2.score;
                                usersArray[i].secTwoS = progress[userId].level_1.section_2.time;
                                usersArray[i].secTwoY = progress[userId].level_1.section_2.attempts;
    
                                usersArray[i].secThreeT = progress[userId].level_1.section_3.score;
                                usersArray[i].secThreeS = progress[userId].level_1.section_3.time;
                                usersArray[i].secThreeY = progress[userId].level_1.section_3.attempts;
    
                                usersArray[i].secFourT = progress[userId].level_1.section_4.score;
                                usersArray[i].secFourS = progress[userId].level_1.section_4.time;
                                usersArray[i].secFourY = progress[userId].level_1.section_4.attempts;
                            }
                        }
                    }
                }
            }

            setData(usersArray);
            setInfo(usersArray);
        };

        fetchData();

    }, [groupName, option.selectedOption, setData])

    return (

        <tbody className="text-sm divide-y divide-slate-200">
            {data.map((item, index) => (
                <tr key={index}>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.id} </div>
                        </div>
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.name} </div>
                        </div>
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center justify-left">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.group} </div>
                        </div>
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.mat} </div>
                        </div>
                    </div>
                </td>



                <td className="whitespace-nowrap bg-gray-200">
                    <div className="flex items-center justify-center">
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secOneT} </div>
                        </div>
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secOneS} </div>
                        </div>
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secOneY} </div>
                        </div>
                    </div>
                </td>

                <td className="whitespace-nowrap bg-white">
                    <div className="flex items-center justify-center">
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secTwoT} </div>
                        </div>
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secTwoS} </div>
                        </div>
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secTwoY} </div>
                        </div>
                    </div>
                </td>

                <td className="whitespace-nowrap bg-gray-200">
                    <div className="flex items-center justify-center">
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secThreeT} </div>
                        </div>
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secThreeS} </div>
                        </div>
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secThreeY} </div>
                        </div>
                    </div>
                </td>

                <td className="whitespace-nowrap bg-white">
                    <div className="flex items-center justify-center">
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secFourT} </div>
                        </div>
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secFourS} </div>
                        </div>
                        <div className="w-5 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secFourY} </div>
                        </div>
                    </div>
                </td>



                
                
            </tr> 
            ))}
        
        </tbody>
    )

}

export default GeneralStatsRow;
