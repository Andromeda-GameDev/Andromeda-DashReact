import React from "react";

const data = [
    {place: "🥇", name: "Juan", date: "2021-05-01", email: "juan@tec.mx", score: 100, matricula: "A01234567"},
    {place: "🥈", name: "Pedro", date: "2021-05-01", email: "pedro@tec.mx", score: 90, matricula: "A01234567"},
    {place: "🥉", name: "Maria", date: "2021-05-01", email: "maria@tec.mx", score: 80, matricula: "A01234567"},
    {place: 4, name: "Jose", date: "2021-05-01", email: "jose@tec.mx", score: 70, matricula: "A01234567"},
    {place: 5, name: "Luis", date: "2021-05-01", email: "luis@tec.mx", score: 60, matricula: "A01234567"},
    {place: 6, name: "Ana", date: "2021-05-01", email: "ana@tec.mx", score: 50, matricula: "A01234567"},
    {place: 7, name: "Luisa", date: "2021-05-01", email: "luisa@tec.mx", score: 40, matricula: "A01234567"},
    {place: 8, name: "Rosa", date: "2021-05-01", email: "rosa@tec.mx", score: 30, matricula: "A01234567"},
    {place: 9, name: "Ricardo", date: "2021-05-01", email: "ricardo@tec.mx", score: 20, matricula: "A01234567"},
    {place: 10, name: "Lorena", date: "2021-05-01", email: "lorena@tec.mx", score: 10, matricula: "A01234567"},
];

const LeaderboardRow = () => {
    return (
        <tbody className="text-sm divide-y divide-slate-200">
            {data.map((item, index) => (
                <tr key={index}>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.place} </div>
                        </div>
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.name} </div>
                        </div>
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.date} </div>
                        </div>
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.email} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.score} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.matricula} </div>
                        </div>
                    </div>
                </td>
            </tr> 
            ))}
        
        </tbody>
    )

}

export default LeaderboardRow;
