
// react imports
import React, { useState, useEffect } from "react";
import {DataType, Table, useTable} from 'ka-table';
import { getDatabase, ref, onValue } from "firebase/database";

function UserModalTable(props){
    const [inputValue, setInputValue] = useState('');
    const [userProgressData, setUserProgressData] = useState([]);

    const handleClose = () => {
        props.onClose();
    };
    const handleSave = () => {
        props.onSave();
        setInputValue('');
    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
      // Connect to database
      const db = getDatabase();

      // Generate the query
      const ref_progress = ref(db, `progress/${props.userKey}/`);
      
      let children = [];
      onValue(ref_progress, (snapshot) => {

        snapshot.forEach((childSnapShot) => {
          const childKey = childSnapShot.key;
          const childData = childSnapShot.val();
          children.push({ key: childKey, data: childData });
        });

        console.log(children);

        const newArray = children.map((item) => {
          const sectionData = Object.keys(item.data).map((section) => {
            return {
              section: section,
              ...item.data[section]
            };
          });
        
          return {
            key: item.key,
            data: sectionData
          };
        });
        console.log(newArray);

        setUserProgressData(newArray);
      });
      
    }, []);



  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">{props.title}</h2>
          </div>

          <div>


            {userProgressData.map((level) => (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 pl-3"> {level.key} </h2>
              <Table
                columns={[
                  {key: 'section', title: 'Section', dataType: DataType.String},
                  {key: 'added', title: 'Added', dataType: DataType.Number},
                  {key: 'score', title: 'Score', dataType: DataType.Number},
                  {key: 'time', title: 'Time', dataType: DataType.Number},
                ]}
                data={level.data}
                rowKeyField={'section'}
              />
              </div>
            ))}



          </div>

          <div className="p-4">
            <div className="flex justify-end">
              <button
                type="button"
                className="mr-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default UserModalTable;