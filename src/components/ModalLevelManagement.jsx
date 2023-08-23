import React, {useEffect, useState} from "react";

// firebase imports
import { ref, getDatabase, get, update } from "firebase/database";

import { UserAuth } from "../context/AuthContext";


function ModalLevelManagement(props){

  const [data, setData] = useState({});

  const handleSave = () => {

    const db = getDatabase();
    const profGRed = ref(db, `professors/${user.uid}/groups/-NY1BIybUwvUl3rjN30M/levels`);
    update(profGRed, data);

    props.onClose();
  };
  const handleClose = () => {
    console.log("HEYEH");
    props.onClose()
  };
  const handleChangeToggle = (key) => {
    setData(prevData => ({
      ...prevData,
      [key]: !prevData[key]
    }));
  };

  const {user} = UserAuth();

  useEffect(() => {

    const db = getDatabase();
    const profGRed = ref(db, `professors/${user.uid}/groups/${props.groupId}/levels`);
    get(profGRed).then((snapshot) => {
      const levelsObject = snapshot.val();
      setData(levelsObject);
    });

  }, []);

  return(
        <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
            <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Control de Acceso</h2>
            </div>

            <div className="p-4">
                <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
                    Configura el acceso a los niveles.
                </label>

                <div>
                    {Object.keys(data).map(item => (
                      <div className="flex items-center space-x-2" key={item}>
                        <input
                          className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                          type="checkbox"
                          role="switch"
                          checked={data[item]}
                          onChange={() => handleChangeToggle(item)}
                          id="flexSwitchCheckDefault"
                        />
                        <p>{item}</p>
                      </div>

                    ))}
                </div>

                <div className="flex justify-end">
                <button
                    type="button"
                    className="mr-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
  
};
export default ModalLevelManagement;
