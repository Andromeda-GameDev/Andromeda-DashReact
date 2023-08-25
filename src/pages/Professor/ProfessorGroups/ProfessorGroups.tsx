import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getDatabase, get, ref, set, push, remove } from "firebase/database";
import { DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Modal} from "@mui/material";
import { ContentContainer, GroupAdministrationTitle } from  "./styles";
import {GroupCardInfo} from "../../../components/GroupCardInfo";
import { Group } from "@mui/icons-material"
import {GroupModal} from "./GroupModal";
import { ModalLevelManagement } from "./ModalLevelManagement";

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Group = {
    Id: string;
    name: string;
    key: string;
}
type InitialObject = {
  [key: string]: boolean;
};

function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const ProfessorGroups: React.FC = () => {
    const { user } = useAuth();

    const [professorGroups, setProfessorGroups] = useState<Group[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [didAddedGroup, setDidAddedGroup] = useState<boolean>(false);
    const [groupCounts, setGroupCounts] = useState<Record<string, number>>({});
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [isLevelManageModalOpen, setIsLevelManageModalOpen] = useState<boolean>(false);
    const [editModalGroupId, setEditModalGroupId] = useState<string>('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleSaveModal = (value: string) => {
        console.log('Input value:', value);
        const db = getDatabase();
        
        // getting the name keys of the current levels
        const ref_levels = ref(db, "levels/");
        get(ref_levels).then((snapshot) => {
            const initialKeys = Object.keys(snapshot.val());
            console.log(initialKeys);
            const initialObject: InitialObject = initialKeys.reduce((acc, key) => {
              acc[key] = false;
              return acc;
            }, {} as InitialObject);
            const ref_prof_groups = push(ref(db, `professors/${user?.uid}/groups/`));
            set(ref_prof_groups, {
                Id: generateRandomString(), 
                name: value,
                levels: initialObject
            });
            setDidAddedGroup(!didAddedGroup);
            setIsModalOpen(false);
        });
      
    };
    // const handleSaveModal = (value: string) => {
    //     if(user){
    //         console.log('Input value:', value);
    //         const db = getDatabase();
    //         const ref_prof_groups = push(ref(db, `professors/${user.uid}/groups/`));
    //         set(ref_prof_groups, {
    //             Id: generateRandomString(),
    //             name: value
    //         });
    //         setDidAddedGroup(!didAddedGroup);
    //         setIsModalOpen(false);
    //     }
    // };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleDeleteGroupButton = (groupKey: string) => {
        const db = getDatabase();
        if(user){
            const ref_prof_groups = ref(db, `professors/${user.uid}/groups/${groupKey}`);
            remove(ref_prof_groups);
            setDidAddedGroup(!didAddedGroup);
        }
    };

    const countStudentsInGroups = async (): Promise<Record<string, number>> => {
        const db = getDatabase();

        const usersSnapshot = await get(ref(db, 'users/'));

        const users = usersSnapshot.val();
        const counts: Record<string, number> = {};

        for(let userId in users){
            const user = users[userId];
            const group = user.group;

            if (counts[group]) {
                counts[group] += 1;
            } else {
                counts[group] = 1;
            }
        }

        return counts;  // this will be an object where the keys are group IDs and the values are counts
    };


    useEffect(() => {
        const fetchGroupCounts = async () => {
            const counts = await countStudentsInGroups();
            setGroupCounts(counts);
        };

        fetchGroupCounts();
    }, []);




    useEffect(() => {
        const db = getDatabase();

        if(user){
            const professorGroupsRef = ref(db, `professors/${user.uid}/groups/`);
            get(professorGroupsRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const groups: Group[] = [];
                    for (const key in data) {
                        groups.push({
                            Id: data[key].Id,
                            name: data[key].name,
                            key: key
                        });
                    }
                    setProfessorGroups(groups);
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
}
    }, [user, didAddedGroup]);

    const handleEditGroupButton = (groupId: string) => {
        setIsEditModalOpen(true);
        setEditModalGroupId(groupId);
    }

    const handleEditModalClose = () => {
        setIsEditModalOpen(false);
    }

    const handleLevelsManageButton = (groupKey: string) => {
        setIsLevelManageModalOpen(true);
        setEditModalGroupId(groupKey);
    }

    return (
        <ContentContainer>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    width: '100%'
                }}
            >
                <GroupAdministrationTitle>Administración de grupos</GroupAdministrationTitle>
                <Button variant="contained"
                        onClick={handleOpenModal}
                        sx={{
                            marginRight: '3rem',
                            marginTop: '2rem',
                            }}>
                    Agregar grupo
                </Button>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginLeft: '6rem',
                }}
                >

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        width: '100%',
                        marginLeft: '0rem',
                        gap: '1rem',
                        marginTop: '2rem',
                    }}
                >
                    {professorGroups.map((group) => (
                        <GroupCardInfo
                            key={group.Id}
                            groupName={group.name}
                            numberOfstudents={groupCounts[group.Id] || 0}
                            onDelete={handleDeleteGroupButton}
                            groupId={group.Id}
                            onEdit={handleEditGroupButton}
                            onLevelsManage={handleLevelsManageButton}
                            groupKey={group.key}
                        />
                    ))}
                </Box>
                <GroupModal groupId={editModalGroupId} onClose={handleEditModalClose} open={isEditModalOpen} />
                {isLevelManageModalOpen && (
                  <ModalLevelManagement
                      onClose={() => setIsLevelManageModalOpen(false)}
                      groupId={editModalGroupId}
                  /> 
                )}
            </Box>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: '0.5rem'
                    }}
                >
                    <DialogTitle
                        sx={{
                            fontWeight: 'bold',
                            }}
                    >Agregar grupo</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre del grupo"
                            type="text"
                            fullWidth
                            onChange={handleInputChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal}>Cancelar</Button>
                        <Button onClick={() => handleSaveModal(inputValue)} variant="contained">Guardar</Button>
                    </DialogActions>
                </Box>
            </Modal>

        </ContentContainer>
    );
}

export default ProfessorGroups;

