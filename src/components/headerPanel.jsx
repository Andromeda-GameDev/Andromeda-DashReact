import React from "react";


function HeaderPanel() {

    const weekdays = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const today = new Date();
    const dayOfWeek = weekdays[today.getDay()];
    const dayOfMonth = today.getDate();
    const month = today.toLocaleString("es-ES", { month: "long" });
    const year = today.getFullYear();

    const date = `${dayOfWeek} ${dayOfMonth} de ${month} de ${year}`;


    return (
        <header className="sticky top-0 bg-white border-b border-slate-200 z-30 shadow">
            <div className="flex items-center justify-between h-20 px-6">
                <div className="flex items-center">
                    <h1 className="text-1xl font-semibold"> Panel de administración </h1>
                </div>

                <div className="ml-auto flex-shrink-0">
                    <span className="inline-flex text-1xl"> {date} </span>
                </div>
            </div>
        </header>
    );
}

export default HeaderPanel;