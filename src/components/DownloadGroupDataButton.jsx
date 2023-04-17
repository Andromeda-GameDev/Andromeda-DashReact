import React, {useState, useEffect} from "react";
import Papa from "papaparse";
import { equalTo, getDatabase, orderByChild, query, ref, get} from "firebase/database";
import { async } from "@firebase/util";


// Grour Name, Group ID, user_id, user_name, user_lastname, user_mail, level, section, added, score, time
function DownloadGroupDataButton(props){

    const [groupProgressData, setGroupProgressData] = useState([]);
    const [donwloadData, setDownloadData] = useState(false);


    const getDataFromDB = async () => {
        const db = getDatabase();
        const result_progress = [];
       const listItems = props.dataArray_t.map((user_dt) => {
            // get Progress object by user Key
            const progressRef = ref(db, `progress/${user_dt.theK}`);
            console.log(user_dt);
            return get(progressRef).then((snapshot) => {
                const dataObj = snapshot.val() || {};


                for (const level in dataObj) {
                    for (const section in dataObj[level]) {
                      result_progress.push({
                        ...user_dt,
                        level,
                        section,
                        ...dataObj[level][section],
                      });
                    }
                }
            });
        });
        await Promise.all(listItems);
        console.log(result_progress);
        setDownloadData(true);
        setGroupProgressData(result_progress);
    };

    const getDataAsCSV = async () => {
        //const promises = getDataFromDB();
        //await getDataFromDB();
        console.log("start csv");
        console.log(groupProgressData);
        const csv = Papa.unparse(groupProgressData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'data.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if(groupProgressData !== [] && donwloadData === true){
            setDownloadData(false);
            getDataAsCSV();
        }
    }, [groupProgressData, donwloadData]);




    return(
        <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={getDataFromDB}> csv </button>
        </div>
    );

}

export default DownloadGroupDataButton;