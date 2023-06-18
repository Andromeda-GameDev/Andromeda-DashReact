import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Chip
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useAuth } from "../../../context/AuthContext";
import { getDatabase, get, ref } from "firebase/database";
import {
    ContentContainer,
    GroupAdministrationTitle,
} from "./styles";
import * as XLSX from "xlsx";

type User = {
    id: string;
    email: string;
    group: string;
    last_name: string;
    name: string;
    progress: Record<string, any>;
};

type SectionData = {
    attempts?: number;
    added?: number;
    score?: number;
    time?: number;
};

const ProfessorStatistics: React.FC = () => {
    const { user } = useAuth();
    const [groups, setGroups] = useState<string[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [levels, setLevels] = useState<string[]>([]);
    const [selectedLevel, setSelectedLevel] = useState<string>("");
    const [students, setStudents] = useState<User[]>([]);
    const [currentGroupId, setCurrentGroupId] = useState<string>("");
    const [showSectionScores, setShowSectionScores] = useState<boolean>(
        false
    );
    const [selectedStudent, setSelectedStudent] = useState<User | null>(
        null
    );


    useEffect(() => {
        if (user) {
            const db = getDatabase();

            // Obtenemos los grupos del profesor
            get(ref(db, `professors/${user.uid}/groups`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const groups = Object.values(data);
                        // Adding the "General" option
                        setGroups(["General", ...groups.map((group: any) => group.name)]);
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });

            // Obtenemos los niveles
            get(ref(db, `levels/`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        const levels = Object.keys(data);
                        setLevels(levels);
                    } else {
                        console.log("No data available");
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [user]);

    const handleGroupChange = (event: SelectChangeEvent) => {
        setSelectedGroup(event.target.value as string);
    };

    const handleLevelChange = (event: SelectChangeEvent) => {
        setSelectedLevel(event.target.value as string);
    };

    const getStudentsInGroup = async (groupId: string) => {
        const db = getDatabase();
        const usersSnapshot = await get(ref(db, `users/`));
        const progressSnapshot = await get(ref(db, `progress/`));

        const usersData: Record<string, User> = usersSnapshot.val();
        const progressData: Record<string, any> = progressSnapshot.val() || {};

        const students: User[] = [];

        for (let userId in usersData) {
            const user = usersData[userId];
            if (user.group === groupId) {
                const userProgress = progressData[userId] || {};
                const userWithProgress: User = { ...user, progress: userProgress };
                students.push(userWithProgress);
            }
        }

        setStudents(students);
    };

    const getAllStudents = async () => {
        const db = getDatabase();
        const usersSnapshot = await get(ref(db, `users/`));
        const progressSnapshot = await get(ref(db, `progress/`));

        const usersData: Record<string, User> = usersSnapshot.val();
        const progressData: Record<string, any> = progressSnapshot.val() || {};

        const students: User[] = [];

        for (let userId in usersData) {
            const user = usersData[userId];
            const userProgress = progressData[userId] || {};
            const userWithProgress: User = { ...user, progress: userProgress };
            students.push(userWithProgress);
        }

        setStudents(students);
    };



    const getGroupIdByName = async (groupName: string) => {
        const db = getDatabase();
        const groupsSnapshot = await get(ref(db, "professors"));
        const professorsData = groupsSnapshot.val();

        for (const professorId in professorsData) {
            const professor = professorsData[professorId];
            const groups = professor.groups;

            for (const groupId in groups) {
                const group = groups[groupId];
                if (group.name === groupName) {
                    return group.Id;
                }
            }
        }

        return null; // Group not found
    };

    useEffect(() => {
        if (selectedGroup === "General") {
            getAllStudents();
        } else {
            getGroupIdByName(selectedGroup).then((groupId) => {
                if (groupId) {
                    getStudentsInGroup(groupId);
                }
            });
        }
    }, [selectedGroup]);


    const handleSectionScoresClick = (student: User) => {
        setSelectedStudent(student);
        setShowSectionScores(true);
    };

    const handleSectionScoresClose = () => {
        setShowSectionScores(false);
        setSelectedStudent(null);
    };

    const exportToExcel = () => {
        const studentsWithProgress = students.filter(
            (student) => student.progress && student.progress[selectedLevel]
        );
        if (studentsWithProgress.length > 0) {
            const workbook = XLSX.utils.book_new();

            const levelData = studentsWithProgress.flatMap((student) =>
                Object.entries(student.progress[selectedLevel] || {}).map(
                    ([section, sectionData]) => {
                        if (typeof sectionData === "object" && sectionData !== null) {
                            return {
                                name: student.name,
                                email: student.email,
                                level: selectedLevel,
                                section,
                                ...sectionData,
                            };
                        } else {
                            return {
                                name: student.name,
                                email: student.email,
                                level: selectedLevel,
                                section,
                            };
                        }
                    }
                )
            );
            if (levelData.length > 0) {
                const worksheet = XLSX.utils.json_to_sheet(levelData);
                XLSX.utils.book_append_sheet(workbook, worksheet, selectedLevel);

                XLSX.writeFile(workbook, "students.xlsx");
            }
        }
    };


    const isDownloadDisabled = students.length === 0;

    return (
        <ContentContainer>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        paddingTop: "2rem",
                        paddingLeft: "3rem",
                        display: "flex",
                        gap: "2rem",
                    }}
                >
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="group-select-label">Grupo</InputLabel>
                        <Select
                            labelId="group-select-label"
                            id="group-select"
                            value={selectedGroup}
                            label="Grupo"
                            onChange={handleGroupChange}
                        >
                            {groups.map((group) => (
                                <MenuItem key={group} value={group}>
                                    {group}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel id="level-select-label">Nivel</InputLabel>
                        <Select
                            labelId="level-select-label"
                            id="level-select"
                            value={selectedLevel}
                            label="Level"
                            onChange={handleLevelChange}
                        >
                            {levels.map((level) => (
                                <MenuItem key={level} value={level}>
                                    {level}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Button
                    variant="contained"
                    sx={{
                        marginRight: "3rem",
                        marginTop: "2rem",
                    }}
                    disabled={isDownloadDisabled}
                    onClick={exportToExcel}
                >
                    Descargar
                </Button>
            </Box>
            <Box>
                {students.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ width: "120vh", minWidth: "100vh", tableLayout: "fixed", overflowY: "scroll"}}
                        >
                            <TableHead
                                sx={{
                                    backgroundColor: '#6d7075',
                                    }}
                            >
                                <TableRow>
                                    <TableCell align={'center'} sx={{color: 'white', fontWeight: 'bold'}}>ID</TableCell>
                                    <TableCell sx={{color: 'white', fontWeight: 'bold'}}>Nombre</TableCell>
                                    <TableCell sx={{color: 'white', fontWeight: 'bold'}}>Grupo</TableCell>
                                    <TableCell sx={{color: 'white', fontWeight: 'bold'}}>Correo</TableCell>
                                    <TableCell sx={{color: 'white', fontWeight: 'bold'}}>Data</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.map((student, index) => (
                                    <TableRow key={index}>
                                        <TableCell align={'center'}>{index}</TableCell>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.group}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        {selectedLevel && student?.progress[selectedLevel] ? (

                                            <TableCell align="left">
                                                {student.progress[selectedLevel] === "No data" ? (
                                                    <Typography variant="body2">No data</Typography>
                                                ) : (
                                                    <IconButton
                                                        onClick={() => handleSectionScoresClick(student)}
                                                        sx={{ p: 0,
                                                            color: '#86e858',
                                                        }}
                                                    >
                                                        <InfoIcon
                                                            sx={{ fontSize: 35 }}
                                                        />
                                                    </IconButton>
                                                )}
                                            </TableCell>
                                        ) : (
                                            <TableCell>
                                                <Chip
                                                    label="Sin progreso"
                                                    sx={{
                                                        backgroundColor: '#f07c51',
                                                        color: 'white',
                                                        fontWeight: 'bold'
                                                    }}
                                                />
                                            </TableCell>
                                        )}

                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </TableContainer>
                ) : (
                    <p>No students found.</p>
                )}
            </Box>
            <Modal open={showSectionScores} onClose={handleSectionScoresClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "white",
                        boxShadow: 24,
                        p: 4,
                        minWidth: 300,
                    }}
                >
                    <Typography variant="h6" mb={2}>
                        Scores for {selectedStudent?.name}
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Section</TableCell>
                                    <TableCell>Attempts</TableCell>
                                    <TableCell>Added</TableCell>
                                    <TableCell>Score</TableCell>
                                    <TableCell>Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedStudent &&
                                selectedStudent.progress &&
                                selectedStudent.progress[selectedLevel] ? (
                                    Object.entries(
                                        selectedStudent.progress[selectedLevel]
                                    ).map(([section, sectionData]) => {
                                        const {
                                            attempts = 0,
                                            added = 0,
                                            score = 0,
                                            time = 0,
                                        }: SectionData = sectionData || {};
                                        return (
                                            <TableRow key={section}>
                                                <TableCell>{section}</TableCell>
                                                <TableCell>{attempts}</TableCell>
                                                <TableCell>{added}</TableCell>
                                                <TableCell>{score}</TableCell>
                                                <TableCell>{time}</TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <Typography variant="body2">No data</Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Modal>
        </ContentContainer>
    );
};

export default ProfessorStatistics;
