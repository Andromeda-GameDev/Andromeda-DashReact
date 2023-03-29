import React from "react";
import Sidebar from "../components/sidebar";
import BarChartAvgTime from "../components/BarChartAvgTime";
import BarChartAvgScore from "../components/BarChartAvgScore";
import GeneralStatsRow from "../components/GeneralStatsRow";
import { CSVLink } from "react-csv";
import DropdownComponent from "../components/DropdownComponent";
import HeaderPanel from "../components/headerPanel";

const Statistics = () => {

    const [table1, setTable1] = React.useState([]);
    const [table2, setTable2] = React.useState([]);
    const [table3, setTable3] = React.useState([]);

    return (
        <div className="flex bg-gray-100">

            <Sidebar />

            <div className="flex flex-col w-full ml-56">

            <HeaderPanel />

            { /* Add button to the top left */}
            
            <div className="flex pt-5 pr-9">
                <div className="ml-8"> 
                    <DropdownComponent /> 
                </div>
                <CSVLink data={table3} filename={"estadisticas_generales.csv"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-full ml-auto"> 
                    Descargar CSV 
                </CSVLink>
            </div>


            <div className="flex flex-wrap p-5">
                <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                    <div className="block max-w-sm rounded-lg bg-white p-3 shadow-lg mb-8">
                        <h2 className="text-1xl font-semibold text-gray-800 pb-5 text-center">Tiempo promedio por sección </h2>
                        <BarChartAvgTime setData={setTable1} /> 
                    </div>
                    <div className="block max-w-sm rounded-lg bg-white p-3 shadow-lg">
                        <h2 className="text-1xl font-semibold text-gray-800 pb-5 text-center">Puntaje promedio por sección</h2>
                        <BarChartAvgScore setData={setTable2}/>
                    </div>
                </div>
                
                <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200 flex-1">
                    <header className="px-5 py-4 border-b border-slate-200">
                        <h2 className="font-semibold text-lg"> Progreso general de los alumnos </h2>
                    </header>

                    <div className="p-3">
                        <div className="overflow-x-auto">
                            <table className="table w-full">
                                { /* Table header */}
                                <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
                                    <tr>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> ID </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap">
                                            <div className="font-semibold text-left"> Nombre </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Grupo </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> Matrícula </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> S1_T </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> S1_S </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> S2_T </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> S2_S </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> S3_T </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> S3_S </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> S4_T </div>
                                        </th>
                                        <th className="p-4 whitespace-nowrap"> 
                                            <div className="font-semibold text-left"> S4_S </div>
                                        </th>
                                        
                                    </tr>
                                </thead>

                                { /* Table body */}

                               <GeneralStatsRow setData={setTable3}/>
                                
                            </table>
                        </div>
                    </div>
                   
                </div>
                
            </div>

            </div>
        </div>

    )
    

}

export default Statistics;