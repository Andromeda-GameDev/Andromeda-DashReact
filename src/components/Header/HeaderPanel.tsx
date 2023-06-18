import React from "react";
import { HeaderPanel, HeaderContent, TitleContainer, DateContainer } from './styles';


const Header: React.FC = () => {

    const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const today = new Date();
    const dayOfWeek = weekdays[today.getDay()];
    const dayOfMonth = today.getDate();
    const month = today.toLocaleString("es-ES", { month: "long" });
    const year = today.getFullYear();

    const date = `${dayOfWeek} ${dayOfMonth} de ${month} de ${year}`;

    return (
        <HeaderPanel>
            <HeaderContent>
                <TitleContainer>
                    <h1> Panel de administración </h1>
                </TitleContainer>

                <DateContainer>
                    <span> {date} </span>
                </DateContainer>
            </HeaderContent>
        </HeaderPanel>
    );
}

export default Header;
