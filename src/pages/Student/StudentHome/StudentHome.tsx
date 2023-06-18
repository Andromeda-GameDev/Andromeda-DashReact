import React, {useState, useEffect} from 'react';
import { useAuth } from "../../../context/AuthContext";
import { ContentContainer} from "./styles";
import {get, getDatabase, ref} from "firebase/database";
import {Box, Typography} from "@mui/material";

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
    const [studentInfo, setStudentInfo] = useState<any>([]);
    const [studentGroup, setStudentGroup] = useState<string>("");
    const [professorName, setProfessorName] = useState<string>("");

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

    const getIntoNewGroup = (newGroup: string) => {
        setStudentGroup(newGroup);
    }
    const deletedAGroup = () => {
        setStudentGroup("");
    }

    return (
        <ContentContainer>
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

                    <Box sx={{ m: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1, flex: 2 }}>
                        <Typography mb={2}
                                    sx={{ fontSize: '1.2em', fontFamily: 'Helvetica' }}
                        >
                            <strong> Grupo: </strong> {studentGroup}
                        </Typography>
                        <Typography mb={2}
                                    sx={{ fontSize: '1.2em', fontFamily: 'Helvetica' }}
                        >
                            <strong> ID: </strong> {studentInfo.group}
                        </Typography>
                        <Typography mb={2}
                                    sx={{ fontSize: '1.2em', fontFamily: 'Helvetica' }}
                        >
                            <strong> Profesor: </strong> {professorName}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </ContentContainer>
    )
}

export default StudentHome;