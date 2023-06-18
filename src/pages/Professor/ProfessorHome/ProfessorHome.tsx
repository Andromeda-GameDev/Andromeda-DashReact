import React from 'react';
import {Card, Box, IconButton, TableBody} from "@mui/material"
import { Group, PlaylistAddCheck} from "@mui/icons-material"
import { ContentContainer, HeaderCardTitle, HeaderCardContent } from "./styles";
import {
    LeaderboardCard,
    LeaderboardTable,
    LeaderboardTableHead,
    LeaderboardTableRow,
    LeaderboardTableCell,
    LeaderboardTitle,
} from "./styles";
import { useAuth } from "../../../context/AuthContext";
import {getDatabase, ref, onValue, get} from "firebase/database";
import { useState, useEffect} from "react";
import { ProfessorCardInfo } from "../../../components/ProfessorCardInfo";

const ProfessorHome: React.FC = () => {

    const {user } = useAuth();
    const [professorName, setProfessorName] = useState("");
    const [numberOfUsers, setNumberOfUsers] = useState(0);
    const [numberOfMatches, setNumberOfMatches] = useState(0);
    const [leaderboardData, setLeaderboardData] = useState<{ place: number; name: any; date: string; email: any; score: number; student_id: any; }[]>([]);


    const getProfessorName = async (professorId:string) => {
        var full_name = ''
        const database = getDatabase()
        const nameRef = ref(database, `professors/${professorId}/name`)
        const lastNameRef = ref(database, `professors/${professorId}/last_name`)
        onValue(nameRef, (snapshot) => {
            const name = snapshot.val()
            full_name = name
        })

        onValue(lastNameRef, (snapshot) => {
            const lastName = snapshot.val()
            full_name = full_name + ' ' + lastName
            setProfessorName(full_name)
        })
    }

    const getNumberOfUsers = async () => {
        const database = getDatabase()
        const usersRef = ref(database, 'users/')
        onValue(usersRef, (snapshot) => {
            setNumberOfUsers(Object.keys(snapshot.val()).length)
        })
    }

    const getNumberOfMatches = async () => {
        const database = getDatabase()
        const usersRef = ref(database, 'progress/')
        onValue(usersRef, (snapshot) => {
            setNumberOfMatches(Object.keys(snapshot.val()).length)
        })
    }

    let date = new Date();
    const fetchLeaderboardData = async () => {
        try {
            const database = getDatabase();
            const usersRef = ref(database, 'users/');
            const snapshot = await get(usersRef);
            const leaderboard = snapshot.val();
            const leaderboardArray = [];

            for (let userId in leaderboard) {
                const userScore = await calculateUserScore(userId);
                leaderboardArray.push({
                    place: 0,
                    name: leaderboard[userId].name,
                    date: date.toLocaleDateString(),
                    email: leaderboard[userId].email,
                    score: userScore,
                    student_id: leaderboard[userId].email.split('@')[0],
                });
            }

            leaderboardArray.sort((a, b) => b.score - a.score);

            for (let i = 0; i < leaderboardArray.length; i++) {
                leaderboardArray[i].place = i + 1;
            }

            setLeaderboardData(leaderboardArray);
        } catch (error : any) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchLeaderboardData();
    }, []);


    useEffect(() => {
        if(user){
            getProfessorName(user.uid);
            getNumberOfUsers();
            getNumberOfMatches();
        }
    }, [user])


    const calculateUserScore = (user : any) => {
        let totalScore = 0;
        let sectionCount = 0;
        const database = getDatabase();
        const userRef = ref(database, 'progress/' + user);

        onValue(userRef, (snapshot) => {
            const progress = snapshot.val();
            for(let level in progress) {
                for(let section in progress[level]) {
                    totalScore += progress[level][section].score;
                    sectionCount++;
                }
            }
        });

        console.log("Scores: " + totalScore + " Sections: " + sectionCount + " Average: " + totalScore/sectionCount + "")
        return totalScore;
    }

    return (
        <ContentContainer>
            <Box sx={
                {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    paddingTop: '20px',
                }
            }>
                <Card
                    sx={{
                        width: '90%',
                        paddingTop: '20px',
                        paddingBottom: '20px',
                        paddingLeft: '20px',
                        backgroundColor: '#C7D2FF',
                    }}
                >
                    <HeaderCardTitle> Hola, {professorName} 👋</HeaderCardTitle>
                    <br/>
                    <HeaderCardContent> Échale un ojo a lo que está pasando en Andromeda hoy </HeaderCardContent>
                </Card>
            </Box>
            <Box sx={
{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '20px',
                }
            }>
                <ProfessorCardInfo displayData={numberOfUsers} displayText={'Usuarios registrados'} icon={Group} color={'e28743'}/>
                <ProfessorCardInfo displayData={numberOfMatches} displayText={'Partidas jugadas'} icon={PlaylistAddCheck} color={'1b90bb'}/>
            </Box>
            <Box sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                paddingTop: '20px',
            }}>
                <LeaderboardCard>
                    <LeaderboardTitle>Leaderboard - Mejores puntajes</LeaderboardTitle>
                    <div className="p-3">
                        <LeaderboardTable>
                            <LeaderboardTableHead>
                                <LeaderboardTableRow>
                                    <LeaderboardTableCell>#</LeaderboardTableCell>
                                    <LeaderboardTableCell>Nombre</LeaderboardTableCell>
                                    <LeaderboardTableCell>Fecha</LeaderboardTableCell>
                                    <LeaderboardTableCell>Correo</LeaderboardTableCell>
                                    <LeaderboardTableCell>Puntaje</LeaderboardTableCell>
                                    <LeaderboardTableCell>Matrícula</LeaderboardTableCell>
                                </LeaderboardTableRow>
                            </LeaderboardTableHead>
                            <TableBody>
                                {leaderboardData.map((item, index) => (
                                    <LeaderboardTableRow key={index}>
                                        <LeaderboardTableCell>{item.place}</LeaderboardTableCell>
                                        <LeaderboardTableCell>{item.name}</LeaderboardTableCell>
                                        <LeaderboardTableCell>{item.date}</LeaderboardTableCell>
                                        <LeaderboardTableCell>{item.email}</LeaderboardTableCell>
                                        <LeaderboardTableCell>{item.score}</LeaderboardTableCell>
                                        <LeaderboardTableCell>{item.student_id}</LeaderboardTableCell>
                                    </LeaderboardTableRow>
                                ))}
                            </TableBody>
                        </LeaderboardTable>
                    </div>
                </LeaderboardCard>
            </Box>
        </ContentContainer>
    );
}

export default ProfessorHome;