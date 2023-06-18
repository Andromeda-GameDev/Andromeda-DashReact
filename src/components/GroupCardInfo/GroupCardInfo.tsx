import React from 'react';
import { Card, IconButton, Menu, MenuItem } from '@mui/material';
import { HeaderCardTitle, HeaderCardContent } from "./styles";
//import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface CustomCardProps {
    groupName: string;
    numberOfstudents: number;
    onDelete: (groupId: string) => void;
    groupId: string;
    onEdit: (groupId: string) => void;
}

const GroupCardInfo: React.FC<CustomCardProps> = ({ groupName , numberOfstudents, onDelete, groupId, onEdit}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card
            sx={{
                width: '30%',
                paddingTop: '20px',
                paddingBottom: '20px',
                paddingLeft: '0px',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.25)',
                marginRight: '25px',
                position: 'relative',
                borderRadius: '10px',
            }}
        >
            <HeaderCardTitle> {groupName} </HeaderCardTitle>
            <br/>
            <HeaderCardContent> {numberOfstudents + " estudiantes"} </HeaderCardContent>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
                sx={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={
                    () => {
                        onEdit(groupId);
                        handleClose();
                    }
                }

                >
                    <IconButton aria-label="edit"
                        sx={{
                            color: "#000000"
                        }}
                    >
                        <SearchIcon />
                    </IconButton>
                    Ver más
                </MenuItem>
                {/*<MenuItem onClick={handleClose}>*/}
                {/*    <IconButton aria-label="export" color="primary">*/}
                {/*        <FileDownloadIcon />*/}
                {/*    </IconButton>*/}
                {/*    Exportar*/}
                {/*</MenuItem>*/}
                <MenuItem
                    onClick={() => {
                        onDelete(groupId);
                        handleClose();
                    }}
                >
                    <IconButton aria-label="delete"
                                sx={{
                                    color: "#ff0000"
                                }}
                    >
                        <DeleteIcon />
                    </IconButton>
                    Delete
                </MenuItem>
            </Menu>
        </Card>
    );
};

export default GroupCardInfo;
