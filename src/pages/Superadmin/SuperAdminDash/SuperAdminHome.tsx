import React, {useEffect, useState} from 'react';
import {ContentContainer} from "./styles";
import {Typography, Box, Card, Table, TableHead, TableRow, TableCell, TableBody, Modal, Button} from "@mui/material";
import {useAuth} from "../../../context/AuthContext";
import {get, getDatabase, ref, set} from "firebase/database";
import Chip from "@mui/material/Chip";


const SuperAdminHome: React.FC = () => {
    const {user} = useAuth()
    const [adminInfo, setAdminInfo] = useState<any>([])
    const [databaseStatus, setDatabaseStatus] = useState<boolean>(true)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [userNumber, setUserNumber] = useState<number>(0)

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    useEffect(() => {
        const db = getDatabase();
        if (user) {
            const userDataRef = ref(db, `admin/${user.uid}/`);
            get(userDataRef).then((snapshot) => {
                const dataObj = snapshot.val() || {};
                //console.log(dataObj);
                setAdminInfo(dataObj);
            });
        }

    }, [user]);

    useEffect(() => {
        // count users
        const db = getDatabase();
        const usersRef = ref(db, "users");
        get(usersRef).then((snapshot) => {
            const usersData = snapshot.val();
            const usersCount = Object.keys(usersData).length;
            setUserNumber(usersCount);
        });

    } , [userNumber])

    const handleToggleDatabase = () => {
        const db = getDatabase();
        const dbEnableRef = ref(db, "db_enabled");
        const newValue = !databaseStatus; // toggle the value
        set(dbEnableRef, newValue).then(() => {
            setDatabaseStatus(newValue);
        });
    };

    useEffect(() => {
        const db = getDatabase();
        const dbEnableRef = ref(db, "db_enabled");

        get(dbEnableRef)
            .then((snapshot) => {
                const dbEnableValue = snapshot.val();
                //console.log(dbEnableValue);
                setDatabaseStatus(dbEnableValue);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    return (
        <ContentContainer>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'top',
                paddingTop: '2rem',
                width: '100%',
            }}>
                <Typography
                    sx={{
                        display: 'flex-start',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'top',
                        paddingBottom: '1rem',
                        paddingLeft: '3rem',
                        fontSize: '1.8rem',
                        fontWeight: 'bold',
                    }}
                >
                    ANDROMEDA V1.02 || Bienvenido {adminInfo.name} {adminInfo.last_name}
                </Typography>
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'top',
                justifyContent: 'top',
                width: '100%',
                height: '100%',
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'top',
                        width: '35%',
                        height: '40%',
                        paddingLeft: '3rem',
                        paddingRight: '3rem',
                    }}
                >
                    <Card sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        mt: 2,
                        ml: 2,
                        mr: 2,
                        borderColor: databaseStatus ? '#3ae06c' : '#e04b3a',
                        borderWidth: '0.2rem',
                        borderStyle: 'solid',
                    }}>
                        <Typography
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'left',
                                justifyContent: 'top',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                paddingTop: '1rem',
                            }}
                        >
                            Database
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                paddingLeft: '1rem',
                                paddingRight: '1rem',
                            }}
                        >
                            <Chip label={databaseStatus ? "Online" : "Offline"} variant="outlined" color="primary"
                                  sx={{
                                      m: 1,
                                      width: '20%',
                                      backgroundColor: databaseStatus ? '#3ae06c' : '#e04b3a',
                                      color: "#FFFFFF",
                                      fontWeight: 'bold',
                                      fontStyle: 'italic',
                                  }}/>
                            <Chip label="Edit" variant="outlined" color="primary"
                                  sx={{
                                      m: 1,
                                      width: '20%',
                                      backgroundColor: '#F5F5F5',
                                  }}
                                  onClick={() => {
                                        setIsModalOpen(true);
                                  }}/>
                        </Box>

                    </Card>
                    <Card sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        mt: 2,
                        ml: 2,
                        mr: 2
                    }}>
                        <Typography
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'left',
                                justifyContent: 'top',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                paddingTop: '1rem',
                            }}
                        >
                            Usuarios Registrados
                        </Typography>
                        <Typography
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'left',
                                justifyContent: 'top',
                                fontSize: '2.5rem',
                                fontWeight: 'bold',
                                paddingTop: '1rem',
                            }}
                        >
                            {userNumber}
                        </Typography>

                    </Card>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'top',
                        width: '50%',
                        height: '40%',
                        paddingRight: '3rem',
                    }}
                >
                    <Card key={1} sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        justifyContent: 'center',
                        mt: 2,
                        p:0,
                    }}>
                        <Typography
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'left',
                                justifyContent: 'top',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                paddingLeft: '2rem',
                                paddingBottom: '1.3rem',
                            }}
                        >
                            Actividad del Sistema
                        </Typography>
                        <Table
                            sx={{
                                width: '100%',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 1,
                                mt: 2,
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">ID</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="center">1</TableCell>
                                    <TableCell align="center">Login</TableCell>
                                    <TableCell align="center">12/10/2021</TableCell>
                                    <TableCell align="center">12:00</TableCell>
                                </TableRow>
                                <TableRow
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell align="center">2</TableCell>
                                    <TableCell align="center">Logout</TableCell>
                                    <TableCell align="center">12/10/2021</TableCell>
                                    <TableCell align="center">12:00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Card>
                </Box>
            </Box>
            <Modal open={isModalOpen} onClose={handleModalClose}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'background.paper',
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Estado de la Base de Datos
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        {databaseStatus ? "¿Quieres desactivar la base de datos?" : "¿Quieres activar la base de datos?"}
                    </Typography>
                    <Box sx={{mt: 2}}>
                        <Button variant="outlined" color="primary" sx={{mr: 2}} onClick={handleModalClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => {
                            handleModalClose();
                            handleToggleDatabase();
                        }}>
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>


        </ContentContainer>
    );
}

export default SuperAdminHome;