import React from "react";

const data = [
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
    {id: '#8635', name: 'Juan Perez', group: 'A', mat: 'A0123456789', secOneT: '90', secOneS: '120', secTwoT: '90', secTwoS: '120', secThreeT: '90', secThreeS: '120', secFourT: '90', secFourS: '120'},
 
];

const GeneralStatsRow = (props) => {

    props.setData(data);

    return (
        <tbody className="text-sm divide-y divide-slate-200">
            {data.map((item, index) => (
                <tr key={index}>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.id} </div>
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
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.group} </div>
                        </div>
                    </div>
                </td>

                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.mat} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secOneT} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secOneS} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secTwoT} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secTwoS} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secThreeT} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secThreeS} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secFourT} </div>
                        </div>
                    </div>
                </td>
                <td className="p-2 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                        <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <div className="font-medium text-slate-800"> {item.secFourS} </div>
                        </div>
                    </div>
                </td>
                
            </tr> 
            ))}
        
        </tbody>
    )

}

export default GeneralStatsRow;
