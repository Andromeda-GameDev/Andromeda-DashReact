import React from "react";

const Card = ({title, amount, percentage, icon, roundedColor }) => {
    return (
        <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl dark:bg-slate-850 dark:shadow-dark-xl rounded-2xl bg-clip-border">
                <div className="flex-auto p-4">
                <div className="flex flex-row -mx-3">
                    <div className="flex-none w-2/3 max-w-full px-3">
                    <div>
                        <p className="mb-0 font-sans font-semibold leading-normal uppercase dark:text-black dark:opacity-60 text-sm">{title}</p>
                        <h5 className="mb-2 font-bold dark:text-black pt-3">{amount}</h5>
                        <p className="mb-2 dark:text-black dark:opacity-60">
                        <span className={`font-bold leading-normal text-sm ${percentage.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{percentage}</span>
                        </p>
                    </div>
                    </div>
                    <div className="px-3 text-right basis-1/3">
                    <div className={`inline-block w-12 h-12 text-center rounded-full ${roundedColor}`}>
                        <span className="inline-flex items-center justify-center h-12 w-12 text-lg dark:text-white"><i className={icon}></i></span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};


export default Card;