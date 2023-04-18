import React from "react";

// ka-table imports
import { Table, DataType } from "ka-table";
import EnableDBCard from "./EnbleDBCard";

const InformativeCard = ({ cardTitle="Title", cardDescription="Description" }) => {
    return(
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{cardTitle}</div>
            <p className="text-gray-700 text-base mb-2">{cardDescription}</p>
            </div>
        </div>
    );
}
const ErrorLogCard = () => {
    const dummyData = [
        {id: "43f2", log: "Error on db", date: "17-04-2023", hour: '16:00:00'},
        {id: "43f2", log: "Error on db", date: "17-04-2023", hour: '16:00:00'},
        {id: "43f2", log: "Error on db", date: "17-04-2023", hour: '16:00:00'},
        {id: "43f2", log: "Error on db", date: "17-04-2023", hour: '16:00:00'},
        {id: "43f2", log: "Error on db", date: "17-04-2023", hour: '16:00:00'},
        {id: "43f2", log: "Error on db", date: "17-04-2023", hour: '16:00:00'},
        {id: "43f2", log: "Error on db", date: "17-04-2023", hour: '16:00:00'},
        {id: "43f2", log: "Error on db", date: "17-04-2023", hour: '16:00:00'},
    ];
    return(
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
            <div className="px-6 py-4">
                <Table
                    columns={[
                        {key: 'id', title: 'ID', dataType: DataType.String},
                        {key: 'log', title: 'Log', dataType: DataType.String},
                        {key: 'date', title: 'Date', dataType: DataType.String},
                        {key: 'hour', title: "Hour", dataType: DataType.String}
                    ]}
                    data={dummyData}
                    rowKeyField={'id'}
                    paging= {{
                        enabled: true,
                        pageSize: 1,
                        pageIndex: 0
                      }}
                />
            </div>
        </div>
    );
}

const AdminMainPanel = () => {

    return(
        <div className="w-screen flex">
                <div className="flex-grow flex flex-wrap">
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4"><EnableDBCard/></div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4"><InformativeCard cardTitle="Registerd Users" cardDescription="14 Registered Users"/></div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4"><ErrorLogCard/></div>
                    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-4"><InformativeCard cardTitle="Registered Groups" cardDescription="6 Registered Groups"/></div>
                </div>
        </div>
    );

};
export default AdminMainPanel;