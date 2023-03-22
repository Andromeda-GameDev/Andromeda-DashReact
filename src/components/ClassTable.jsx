// react imports
import React, { useEffect, useState } from "react";

// ka-table imports
import { DataType, Table, useTable} from 'ka-table';

// firebase imports
//import { getDatabase, get, ref, orderByChild, onValue} from "firebase/database";
import {ref, getDatabase, query, equalTo, orderByChild, get} from "firebase/database";
import { async } from "@firebase/util";

// Context files
import { UserAuth } from "../context/AuthContext";
import { data } from "autoprefixer";

export default function ClassTable(props){

    // UseStates
    const [tableData, setTableData] = useState([]);
    
    // delete handlers
    const handleDeleteGroupButton = () => {
        props.delHandler(props.gKey);
    };

    useEffect(() => {
        // Connect to database
        const db = getDatabase();
 
        // Generating query
        const q = query(ref(db, 'users/'), orderByChild('group'), equalTo(props.Id));
        
        // Getting the data
        get(q).then((snapshot) => {
            const dataObj = snapshot.val() || {};
            const dataArray = Object.keys(dataObj).map(key => ({ 
                name: dataObj[key].name,
                last_name: dataObj[key].last_name,
                email: dataObj[key].email, 
            }));
            console.log(dataArray);
            setTableData(dataArray);
        });

    }, [])


    return(
        <div>
            <div className="flex flex-row justify-between items-center h-14">
                <p className="text-base font-bold pl-2">{props.nm}</p>
                <p className="text-base font-medium pl-2"> {`ID: ${props.Id}`} </p>
                <div className="pr-2"><button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400" onClick={handleDeleteGroupButton}>Delete</button></div>
            </div>
            <Table
                columns={[
                    {key: 'name', title: 'Name', dataType: DataType.String},
                    {key: 'last_name', title: 'Last Name', dataType: DataType.String},
                    {key: 'email', title: 'Email', dataType: DataType.String}
                ]}
                data={tableData}
                rowKeyField={'name'}
            />
        </div>
    );

}