import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from "@mui/material";
import { useAuth } from "../../../context/AuthContext";
import { getDatabase, get, ref } from "firebase/database";
import { ContentContainer } from "./styles";

interface ProgressSection {
    added: number;
    attempts: number;
    score: number;
    time: number;
}

const StudentStatistics: React.FC = () => {

    const { user } = useAuth();
    const [progressData, setProgressData] = useState<Record<string, Record<string, ProgressSection>>>({});
    const [levelData, setLevelData] = useState({});

    useEffect(() => {
        const db = getDatabase();
        if(user){
            const progressDataRef = ref(db, `progress/${user.uid}/`);
            const levelDataRef = ref(db, `levels/`);

            // Fetch progress data and level data
            Promise.all([get(progressDataRef), get(levelDataRef)]).then(([progressSnapshot, levelSnapshot]) => {
                setProgressData(progressSnapshot.val() || {});
                setLevelData(levelSnapshot.val() || {});
            });
        }

    }, [user]);

    return (
        <ContentContainer>
            <Typography sx={{ fontWeight: "bold", fontSize: "1.6rem", paddingTop: "2rem", }}>
                Tu progreso
            </Typography>

            {Object.keys(progressData).map((levelKey) => (
                <Box key={levelKey} sx={{width: "90%"}}>
                    <Typography sx={{ fontWeight: "bold", fontSize: "1.4rem", paddingTop: "2rem" }}>
                        {levelKey}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sección</TableCell>
                                    <TableCell>Adición</TableCell>
                                    <TableCell>Intentos</TableCell>
                                    <TableCell>Calificación</TableCell>
                                    <TableCell>Tiempo</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Object.entries(progressData[levelKey]).map(([sectionKey, progress]) => (
                                    <TableRow key={sectionKey}>
                                        <TableCell>{sectionKey}</TableCell>
                                        <TableCell>{progress.added}</TableCell>
                                        <TableCell>{progress.attempts}</TableCell>
                                        <TableCell>{progress.score}</TableCell>
                                        <TableCell>{progress.time.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            ))}
        </ContentContainer>
    );
}

export default StudentStatistics;
