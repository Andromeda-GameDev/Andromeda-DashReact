import React, { useEffect, useState } from "react";

// ka-table imports
import { Table, DataType } from "ka-table";

// firebase imports
import {ref, getDatabase, onValue, query, equalTo, orderByChild, get, remove } from "firebase/database";
import ConfirmationModal from "./ConfirmationModal";

const CRUD_users = ({type_user}) => {

    const [listUsers, setListUsers] = useState([]);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [isDisableModalOpen, setIsDisableModalOpen] = useState(false);
    const [selectedField, setSelectedField] = useState('');
    const [madeChanges, setMadeChanges] = useState(false);

    const handleCloseFunction = () => {
        setIsRemoveModalOpen(false);
        setIsDisableModalOpen(false);
        setSelectedField('');
    }
    const handleSaveFunction = () => {
        if(isRemoveModalOpen){
            const db = getDatabase();
            const userRef = ref(db, `${type_user}/${selectedField}`);
            remove(userRef)
              .then(() => {
                console.log(`User with key ${selectedField} deleted`);
                setMadeChanges(!madeChanges);
              })
              .catch((error) => {
                console.error(error);
            });
        }else if(isDisableModalOpen){

        }
        setIsRemoveModalOpen(false);
        setIsDisableModalOpen(false);
        setSelectedField('');
    }

    useEffect(() => {
        const db = getDatabase();
        const usersRef = ref(db, type_user);
    
        // Retrieve the list of users from the database and transform it into an array of user objects
        get(usersRef).then((snapshot) => {
            const usersObject = snapshot.val();
            const users = [];
    
            // Loop through each user object and transform it into a user object with the required properties
            for (const userKey in usersObject) {
                const user = usersObject[userKey];
                const userObject = {
                    userKey,
                    email: user.email,
                    name: user.name,
                    group: user.group,
                    last_name: user.last_name,
                };
                users.push(userObject);
            }
            setListUsers(users);
            console.log(users); // The array of user objects
        });
    }, [madeChanges]);

    return(
        <div>
            {
                type_user === "users" ?
                    <p className="text-2xl font-bold mb-4" >Estudiantes</p>
                :
                    <p className="text-2xl font-bold mb-4" >Profesores</p>
            }
            <Table
                columns={[
                    {key: 'name', title: 'Name', dataType: DataType.String},
                    {key: 'last_name', title: 'Last Name', dataType: DataType.String},
                    {key: 'email', title: 'Email', dataType: DataType.String},
                    {key: 'remove', title: 'Remove', width: 200},
                    {key: 'disable', title: 'Disable', width: 200},
                ]}
                data={listUsers}
                rowKeyField={'name'}
                childComponents={{
                    cell: {
                        content: (props) => {
                            if (props.column.key === 'remove'){
                                return(
                                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-5 rounded" onClick={() => {
                                        setIsRemoveModalOpen(true);
                                        setSelectedField(props.rowData.userKey);
                                    }}>
                                       Remove 
                                    </button>
                                );
                            }
                            if (props.column.key === 'disable'){
                                return(
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-5 rounded" onClick={() => {
                                        setIsDisableModalOpen(true);
                                        setSelectedField(props.rowData.userKey);
                                    }}>
                                       Disable 
                                    </button>
                                );
                            }
                        }
                    },
                }}
            />
            {isRemoveModalOpen && (
                <ConfirmationModal modalTitle={"Remove"} closeFunction={handleCloseFunction} saveFunction={handleSaveFunction}/>
            )}
            {isDisableModalOpen && (
                <ConfirmationModal modalTitle={"Disable"} closeFunction={handleCloseFunction} saveFunction={handleSaveFunction}/>
            )}
        </div>
    );
};
export default CRUD_users;