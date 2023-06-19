import React, { useEffect, useState } from 'react';
import {getDatabase, ref, onValue, remove} from "firebase/database";
import { ContentContainer } from "./styles";
import { Box, Chip, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from "@mui/icons-material/Delete";

interface User {
    email: string;
    group: string;
    last_name: string;
    name: string;
    uid: string;
}

const SuperAdminStudents: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [selectedField, setSelectedField] = useState<string>("");

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, userId: string) => {
        console.log("Menu click" + userId)
        setSelectedField(userId);
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        const db = getDatabase();
        const userRef = ref(db, `users/${selectedField}`);
        remove(userRef)
            .then(() => {
                console.log(`User with key ${selectedField} deleted`);
            })
            .catch((error) => {
                console.error(error);
            });
        handleMenuClose();
    };


    const handleDisable = () => {
        console.log("Disable user");
        handleMenuClose();
    };

    useEffect(() => {
        const db = getDatabase();
        const usersRef = ref(db, 'users/');
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            const userList: User[] = [];
            for(let uid in data) {
                userList.push({ ...data[uid], uid });
            }
            setUsers(userList);
        });
    }, []);


    return (
        <ContentContainer>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    sx={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "#000000",
                        margin: "1rem",
                    }}
                >
                    Estudiantes
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "85%",
                }}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <TableContainer component={Paper}>
                    <Table sx={{ width: "100%" }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell align="right">Apellido</TableCell>
                                <TableCell align="right">Correo</TableCell>
                                <TableCell align="right">Estatus</TableCell>
                                <TableCell align="right">Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={index}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell align="right">{user.last_name}</TableCell>
                                    <TableCell align="right">{user.email}</TableCell>
                                    <TableCell align="right">
                                        <Chip label="Active" color="success" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="more"
                                            aria-controls="long-menu"
                                            aria-haspopup="true"
                                            onClick={(event) => handleMenuClick(event, user.uid)}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            id="long-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleMenuClose}
                                            PaperProps={{
                                                style: {
                                                    maxHeight: 48 * 4.5,
                                                    width: '20ch',
                                                },
                                            }}
                                        >
                                            <MenuItem onClick={handleDelete}>
                                                <IconButton aria-label="edit"
                                                            sx={{
                                                                color: "#000000"
                                                            }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                Eliminar
                                            </MenuItem>
                                            <MenuItem onClick={handleDisable}>
                                                <IconButton aria-label="edit"
                                                            sx={{
                                                                color: "#000000"
                                                            }}
                                                >
                                                    <BlockIcon />
                                                </IconButton>
                                                Deshabilitar
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </ContentContainer>
    );
}

export default SuperAdminStudents;
