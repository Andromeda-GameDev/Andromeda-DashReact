// src/components/Announcements.js
import React from 'react';

const dummyAnnouncements = [
    {
        title: 'Intentos de nivel 1 - 20/02/2023',
        content:
            'Hola chavos, buen día. Recuerden que tienen hasta el viernes para completar por lo menos un intento del nivel 1. ¡Ánimo!',
        date: '20/02/2023',
    },
    {
        title: 'Adelanto de inicio de nivel 2 - 17/02/2023',
        content:
            'Hola!, Recuerden que los que quieran, pueden ir familizandose con los problemas del nivel 2, solo que no se registrará nada y los datos cambiarán.',
        date: '17/02/2023',
    },
    {
        title: 'Bienvenida a la materia - 13/02/2023',
        content:
            'Hola a todos! Bienvenidos al curso TC10067, prepárense para una aventura!',
        date: '13/02/2023',
    },
];

const Announcements = () => {
    return (
        <div className="mt-8 mx-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Panel de anuncios </h2>
            {dummyAnnouncements.map((announcement, index) => (
                <div key={index} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold">{announcement.title}</h3>
                        <span className="text-gray-500 text-sm">{announcement.date}</span>
                    </div>
                    <p className="text-gray-600">{announcement.content}</p>
                </div>
            ))}
        </div>
    );
};


export default Announcements
