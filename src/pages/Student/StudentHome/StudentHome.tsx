import React, {useState, useEffect} from 'react';
import { useAuth } from "../../../context/AuthContext";
import { ContentContainer} from "./styles";
import {DataSnapshot, get, getDatabase, ref, set} from "firebase/database";
import {AlertColor, Box, Card, Input, InputLabel, TextField, Typography, Alert, AlertProps, Link} from "@mui/material";
import Button from "@mui/material/Button";
import {updatePassword, getAuth} from "firebase/auth";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CancelIcon from '@mui/icons-material/Cancel';
import {State} from "../StudentSettings/StudentSettings";

interface Announcement {
    title: string;
    content: string;
    date: string;
}

const dummyAnnouncements: Announcement[] = [
    {
        title: 'Intentos de nivel 1',
        content: 'Hola chavos, buen día. Recuerden que tienen hasta el viernes para completar por lo menos un intento del nivel 1. ¡Ánimo!',
        date: '20/02/2023',
    },
    {
        title: 'Adelanto de inicio de nivel 2',
        content: 'Hola!, Recuerden que los que quieran, pueden ir familizandose con los problemas del nivel 2, solo que no se registrará nada y los datos cambiarán.',
        date: '17/02/2023',
    },
    {
        title: 'Bienvenida a la materia',
        content: 'Hola a todos! Bienvenidos al curso TC10067, prepárense para una aventura!',
        date: '13/02/2023',
    },
];


const StudentHome: React.FC = () => {

    const {user} = useAuth();
    const auth = getAuth();
    const [studentInfo, setStudentInfo] = useState<any>([]);
    const [studentGroup, setStudentGroup] = useState<string>("");
    const [professorName, setProfessorName] = useState<string>("");
    const [isFirstTimePopUp, setIsFirstTimePopUp] = useState<boolean>(false);
    const [error, setError] = useState('');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isPassword1Valid, setIsPassword1Valid] = useState<boolean>(false);
    const [isPassword2Valid, setIsPassword2Valid] = useState<boolean>(false);

    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("success");

    const [groups, setGroups] = useState<Array<{Id: string, name: string}>>([]);
    const [group, setGroup] = useState<string>("");

    const [editGroupModalOpen, setEditGroupModalOpen] = useState<boolean>(false);

    const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    useEffect(() => {
        const getGroups = async () => {
            const db = getDatabase();
            const groupsRef = ref(db, 'professors');
            let groups: Array<{Id: string, name: string}> = [];

            const snapshot = await get(groupsRef);
            if (snapshot.exists()) {
                snapshot.forEach((professor: DataSnapshot) => {
                    const professorData = professor.val();
                    if (professorData.groups) {
                        for (const groupId in professorData.groups) {
                            groups.push(professorData.groups[groupId]);
                        }
                    }
                });
            } else {
                console.log("No data available");
            }

            return groups;
        }

        getGroups().then((groups) => {
            return setGroups(groups);
        });

        //console.log(groups)
    }, []);

    const addGroup = async (groupId: string) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${user?.uid}/`);

        for(const group of groups){
            if(group.Id === groupId){
                try {
                    await set(userRef, {
                        email: studentInfo.email,
                        group: groupId,
                        last_name: studentInfo.last_name,
                        name: studentInfo.name,
                        validated: false,
                    });

                    handleOpen({ vertical: 'top', horizontal: 'center' }, "Grupo actualizado", "success")

                    return;
                } catch (error) {
                    handleOpen({ vertical: 'top', horizontal: 'center' }, "Error al actualizar el grupo", "error")
                }
            }else{
                handleOpen({ vertical: 'top', horizontal: 'center' }, "Grupo no encontrado", "error")
            }
        }
    }

    const getGroupName = async (groupId:string) => {
        const db = getDatabase();
        const professorsRef = ref(db, "professors");

        const snapshot = await get(professorsRef);

        if (!snapshot.exists()) {
            console.log("No data available");
            return null;
        }

        const professorsData = snapshot.val();

        for (const professorKey in professorsData) {
            const groups = professorsData[professorKey].groups;
            for (const groupKey in groups) {
                if (groups[groupKey].Id === groupId) {
                    setStudentGroup(String(groups[groupKey].name));
                    setProfessorName(String(professorsData[professorKey].name));
                    return groups[groupKey].name;
                }
            }
        }

        console.log(`No group found with Id ${groupId}`);
        return null;
    }

    const getValidationStatus = async () => {
        const db = getDatabase();
        const userRef = ref(db, `users/${user?.uid}/`);

        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
            console.log("No data available");
            return null;
        }

        const userData = snapshot.val();
        return userData.validated;
    }

    const updateValidationStatus = async (status: boolean) => {
        const db = getDatabase();
        const userRef = ref(db, `users/${user?.uid}/`);

        await set(userRef, {
            email: studentInfo.email,
            group: studentInfo.group,
            last_name: studentInfo.last_name,
            name: studentInfo.name,
            validated: status,
        });
    }

    const handlePasswordChange = async () => {
        try{
            if (auth.currentUser) {
                await updatePassword(auth.currentUser, password);
                handleOpen({ vertical: 'top', horizontal: 'center' }, "Contraseña actualizada", "success")

                updateValidationStatus(true);

                // set timer after 3 seconds
                setTimeout(() => {
                    setIsFirstTimePopUp(false)
                }, 3000);

            }
        } catch (error) {
            handleOpen({ vertical: 'top', horizontal: 'center' }, "Error al actualizar la contraseña", "error")
        }
    }

    const handleClose = () => {
        setState({ ...state, open: false });
    }

    const handleOpen = (newState: SnackbarOrigin, message: string, severity: AlertColor) => {
        setState({ open: true, ...newState});
        setMessage(message);
        setSeverity(severity);
    }

    useEffect(() => {
        if (auth.currentUser) {
            //console.log("Current email: " + auth.currentUser.email);
        }
    }, [auth.currentUser])


    useEffect(() => {
        getValidationStatus().then((status) => {
            if(status === false){
                setIsFirstTimePopUp(true);
            }
        } )
    }, [user]);

    useEffect(() => {
        const db = getDatabase();
        if(user){
            const userDataRef = ref(db, `users/${user.uid}/`);
            get(userDataRef).then((snapshot) => {
                const dataObj = snapshot.val() || {};
                //console.log(dataObj);
                setStudentInfo(dataObj);
                getGroupName(dataObj.group);
            });
        }

    }, [user, studentGroup]);

    useEffect(() => {
    }, [isPassword1Valid, isPassword2Valid]);

    const getIntoNewGroup = (newGroup: string) => {
        setStudentGroup(newGroup);
    }
    const deletedAGroup = () => {
        setStudentGroup("");
    }


    const validatePassword = (password: string) => {
        const passwordRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if(passwordRegex.test(password)){
            setIsPassword1Valid(true);
            return '';
        } else {
            setIsPassword1Valid(false);
            return "* La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un caracter especial";
        }
    }

    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        if(password !== confirmPassword){
            setIsPassword2Valid(false);
            return "* Las contraseñas no coinciden";
        }

        setIsPassword2Valid(true);
        return '';
    }

    return (

        <ContentContainer>
            {isFirstTimePopUp &&
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0.5)",
                    zIndex: 1000,
                }}>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    autoHideDuration={3000}
                    key={vertical + horizontal}
                >
                    <MuiAlert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </MuiAlert>
                </Snackbar>
                <Card
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "50%",
                        height: "57%",
                        bgcolor: "white",
                        borderRadius: 2,
                        boxShadow: 1,
                        p: 2
                    }}>

                    <Typography
                        sx={{
                            fontSize: '1.5em',
                            fontWeight: 'bold',
                            fontFamily: 'Helvetica',
                            mb: 2,
                            marginTop: '2rem'
                        }}>
                        ¡Bienvenid@ a la plataforma de Andromeda!
                    </Typography>

                    <Typography
                        sx={{
                            fontSize: '1.2em',
                            fontFamily: 'Helvetica',
                            mb: 2,
                            margin: '0 3rem'
                        }}>
                        Estamos emocionados de que estés aquí y no podemos esperar para que comiences tu aventura. Sin embargo, antes de empezar te pedimos que establezcas una contraseña con la que podrás accedar al juego en conjunto de tu correo:
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '1.2em',
                            fontFamily: 'Helvetica',
                            mb: 2,
                            marginTop: '2rem',
                            fontWeight: 'bold',
                            color: 'blue'
                        }}>
                        {studentInfo.email}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '1.2em',
                            fontFamily: 'Helvetica',
                            mb: 2,
                            margin: '0 3rem'
                        }}>
                        Por favor escribe una contraseña de al menos 8 caracteres, una mayúscula, un número y un caracter especial:
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 1, width: "90%", marginTop: "2rem"}}>
                        <TextField
                            type='password'
                            sx={{ width: '100%' }}
                            color={isPassword1Valid ? 'success' : 'primary'}
                            id="outlined-basic"
                            label="Contraseña"
                            variant="outlined"
                            value={password}
                            onChange={(e) => {
                                const val = e.target.value;
                                setPassword(val);
                                setError(validatePassword(val));
                            }}
                        />
                        <TextField
                            type='password'
                            sx={{ width: '100%'}}
                            color={isPassword2Valid ? 'success' : 'primary'}
                            id="outlined-basic"
                            label="Confirmar contraseña"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => {
                                const val = e.target.value;
                                setConfirmPassword(val);
                                setError(validateConfirmPassword(password, val));
                            }}
                        />
                    </Box>
                    { error &&
                        <Typography
                            sx={{
                                fontSize: '0.9rem',
                                fontFamily: 'Helvetica',
                                marginTop: '1rem',
                                color: 'red',
                                marginLeft: '2rem'
                            }}>
                            {error}
                        </Typography>
                    }

                    <Typography
                        sx={{
                            fontSize: '1.2em',
                            fontFamily: 'Helvetica',
                            mb: 2,
                            margin: '0 3rem',
                            marginTop: '1rem',
                        }}>
                        Ya casi estamos dentro, si tienes el código de tu grupo, puedes escribirlo aquí para que te agreguemos a él:
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 1, width: "90%", marginTop: "2rem"}}>
                        <TextField
                            sx={{ width: '100%' }}
                            id="outlined-basic"
                            label="Código de grupo"
                            variant="outlined"
                            value={group}
                            onChange={(e) => {
                                const val = e.target.value;
                                setGroup(val);
                            } }
                        />
                        <Typography
                            sx={{
                                fontSize: '0.7rem',
                                fontFamily: 'Helvetica',
                                margin: '0 1rem',
                                marginTop: '1rem',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}>

                            <Button
                                variant="outlined"
                                sx={{ fontSize: '0.7rem', fontWeight: 'bold', fontFamily: 'Helvetica'}}
                                onClick={() => {
                                    addGroup(group);
                                    getIntoNewGroup(group);
                                }}

                            >
                                Añadir
                            </Button>
                        </Typography>
                    </Box>
                    <Typography
                        sx={{
                            fontSize: '0.7rem',
                            fontFamily: 'Helvetica',
                            margin: '0 1rem',
                            marginTop: '1rem',
                            fontWeight: 'bold',
                        }}
                    >
                        * Si no tienes el código, puedes omitir este paso
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 1, width: "40%", marginTop: "2rem"}}>
                        <Button variant="contained"
                                sx={{width: '100%', backgroundColor: '#4f46e5', color: 'white', fontWeight: 'bold', fontSize: '1.2em', fontFamily: 'Helvetica'}}
                                onClick={() => {
                                    handlePasswordChange();
                                }}

                                disabled={error !== '' || !isPassword1Valid || !isPassword2Valid}
                        >
                            Guardar
                        </Button>
                    </Box>

                </Card>
            </Box>
            }
            <Box
                sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "top",
                    width: "100%",
                    height: "100%",
                }}
            >
                <img
                    style={{width: "100%", height: "35%"}}
                    src={"https://www.publicdomainpictures.net/pictures/140000/velka/banner-header-1449745071UBW.jpg"}
                />
                <Typography
                    sx={{
                        position: 'absolute',
                        color: 'white',
                        fontSize: '2.2em',
                        textAlign: 'center',
                        top: '13%',
                        fontWeight: 'bold',
                        fontFamily: 'Gill Sans',
                    }}
                >
                    Hola, {studentInfo.name} 👋
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1, mt: 2, width: "95%"}}>
                    <Box sx={{ m: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, flex: 8 }}>
                        <Typography mb={2}
                                    sx={{ fontSize: '1.7em', fontWeight: 'bold', fontFamily: 'Helvetica' }}
                        >
                            Panel de anuncios
                        </Typography>
                        {dummyAnnouncements.map((announcement, index) => (
                            <Box key={index} mb={2}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                    <Typography
                                        sx={{ fontSize: '1.2em', fontWeight: 'bold', fontFamily: 'Helvetica' }}
                                    >
                                        {announcement.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {announcement.date}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" color="text.primary">
                                    {announcement.content}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    <Box sx={{ bgcolor: 'transparent', flex: 3 }}>
                        <Box sx={{ m: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, flex: 2, position: 'relative' }}>
                            <Typography mb={2} sx={{ fontSize: '1.2em', fontFamily: 'Helvetica' }}>
                                <strong> Grupo: </strong> {studentGroup}
                            </Typography>
                            <Typography mb={2} sx={{ fontSize: '1.2em', fontFamily: 'Helvetica' }}>
                                <strong> ID: </strong> {studentInfo.group}
                            </Typography>
                            <Typography mb={2} sx={{ fontSize: '1.2em', fontFamily: 'Helvetica' }}>
                                <strong> Profesor: </strong> {professorName}
                            </Typography>

                            <Button
                                sx={{
                                    position: 'absolute',
                                    bottom: 8,
                                    right: 8,
                                    textTransform: 'none',
                                }}
                                onClick={() => setEditGroupModalOpen(true)}
                            >
                                Editar
                            </Button>
                        </Box>

                        {editGroupModalOpen &&
                            <Box sx={{ m: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, flex: 2, position: 'relative' }}>
                                <TextField
                                    sx={{ width: '100%' }}
                                    id="outlined-basic"
                                    variant="outlined"
                                    value={group}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setGroup(val);
                                    } }
                                    placeholder={studentInfo.group}
                                />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        mt: 2,
                                        width: '100%',
                                        gap: 1,
                                    }}
                                >
                                    <Button
                                        variant="outlined"
                                        sx={{ width: '60%', backgroundColor: '#4f46e5', color: 'white', fontWeight: 'bold', fontSize: '1em', fontFamily: 'Helvetica' }}
                                        onClick={() => {
                                            addGroup(group);
                                            getIntoNewGroup(group);
                                        }}
                                    >
                                        Guardar
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{ width: '60%', color: 'red', fontWeight: 'bold', fontSize: '1em', fontFamily: 'Helvetica' }}
                                        onClick={() => {
                                            setEditGroupModalOpen(false);
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                </Box>
                            </Box>
                        }
                    </Box>

                </Box>
            </Box>
        </ContentContainer>
    )
}

export default StudentHome;