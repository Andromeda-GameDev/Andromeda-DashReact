import React from "react";
import { Card, IconButton } from "@mui/material";
import { HeaderCardTitle, HeaderCardContent } from "./styles";
import { Group } from "@mui/icons-material";
import { SvgIconComponent } from "@mui/icons-material";

interface CustomCardProps {
    displayData: number;
    displayText: string;
    icon: SvgIconComponent;
    color: string;
}

const ProfessorCardInfo: React.FC<CustomCardProps> = ({ displayData , displayText, icon: Icon, color}) => {
    return (
        <Card
            sx={{
                width: '25%',
                paddingTop: '20px',
                paddingBottom: '20px',
                paddingLeft: '0px',
                boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.25)',
                marginRight: '25px',
                position: 'relative',
                borderRadius: '10px',
            }}
        >
            <HeaderCardTitle> {displayData} </HeaderCardTitle>
            <br/>
            <HeaderCardContent> {displayText} </HeaderCardContent>
            <IconButton
                sx={{ position: 'absolute', top: '50%', right: '30px', transform: 'translateY(-50%)' }}
                aria-label="users"
            >
                <Icon
                    fontSize={'large'}
                    sx={{
                        color: `#${color}`,
                    }}
                />
            </IconButton>
        </Card>
    );
};

export default ProfessorCardInfo;
