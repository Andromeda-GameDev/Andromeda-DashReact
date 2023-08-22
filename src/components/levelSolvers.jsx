import React, {useEffect, useState} from "react";
// ka-table imports
import {Table, DataType} from "ka-table";

// firebase imports
import { getDatabase, ref, get } from "firebase/database";

// SidedBar
import Sidebar from "../components/sidebar";

// HeaderPanel
import HeaderPanel from "../components/headerPanel";

const data = [
  {level: "1", name: "level_1", url: "https://www.google.com"},
  {level: "2", name: "level_2", url: "https://www.facebook.com"},
];

const LevelSolvers = () => {
  const [data, setData] = useState([]); 

  useEffect(() => {
    const db = getDatabase();
    const levelsRef = ref(db, `levels`);

    // Retrieve all the levels info
    get(levelsRef).then((snapshot) => {
      const levelObject = snapshot.val();
      console.log(JSON.stringify(levelObject, null, 2));
      const dt = Object.keys(levelObject).map((key) => {
        const level = key.split('_')[1];
        const name = key;
        const url = levelObject[key].url;
        return { level, name, url };
      });
      setData(dt)
    });

  }, []);
  
  return(
    <div className="flex bg-gray-100">
      <div className="flex">
        <Sidebar/>
      </div>
      <div className="ml-56">
          <HeaderPanel />
          <Table 
            columns={[
              {key: "level", title: "Level", dataType: DataType.String},
              {key: "name", title: "name", dataType: DataType.String},
              {key: "url", title: "URL", width: 200}
            ]}
            rowKeyField={'level'}
            data={data}
            childComponents={{
              cell: {
                content: (props) => {
                  if(props.column.key === "url"){
                    return(
                      <a href={props.rowData.url} target="_blank" rel="noopener noreferrer">
                        <button className="rounded-full bg-blue-500 text-white px-4 py-2">
                          Open
                        </button>
                      </a>
                    );
                  }
                }
              }
            }}
          />
      </div>

       
    </div>
  );
};
export default LevelSolvers;
