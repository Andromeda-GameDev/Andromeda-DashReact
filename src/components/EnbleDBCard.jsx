import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, get } from "firebase/database";

const EnableDBCard = () => {
    const [isDatabaseEnabled, setIsDatabaseEnabled] = useState(true);

    const handleToggleDatabase = () => {
        const db = getDatabase();
        const dbEnableRef = ref(db, "db_enabled");
        const newValue = !isDatabaseEnabled; // toggle the value
        set(dbEnableRef, newValue).then(() => {
          setIsDatabaseEnabled(newValue);
        });
    };

    useEffect(() => {
        const db = getDatabase();
        const dbEnableRef = ref(db, "db_enabled");
        
        get(dbEnableRef)
          .then((snapshot) => {
            const dbEnableValue = snapshot.val();
            console.log(dbEnableValue);
            setIsDatabaseEnabled(dbEnableValue);
          })
          .catch((error) => {
            console.error(error);
        }); 
    }, []);
  
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Enable or Disable Database</div>
          <button
            className={`px-4 py-2 rounded ${
              isDatabaseEnabled ? "bg-green-500 hover:bg-green-700" : "bg-red-500 hover:bg-red-700"
            } text-white`}
            onClick={handleToggleDatabase}
          >
            {isDatabaseEnabled ? "Enabled" : "Disabled"}
          </button>
        </div>
      </div>
    );
};
export default EnableDBCard;