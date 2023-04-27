import React from "react";

const StudentProgress = ({ progressData }) => {
    const renderLevelData = () => {
        if (!progressData) {
            return <p>No data available</p>;
        }

        const levelKey = "level_1";
        const levelSections = 4;

        return Array.from({ length: levelSections }, (_, i) => {
            const sectionKey = `section_${i + 1}`;
            const sectionProgress = progressData[levelKey]?.[sectionKey] || {};

            return (
                <tr key={`${levelKey}_${sectionKey}`}>
                    <td className="border px-4 py-2">{levelKey}</td>
                    <td className="border px-4 py-2">{sectionKey}</td>
                    <td className="border px-4 py-2">{sectionProgress.attempts || 0}</td>
                    <td className="border px-4 py-2">{sectionProgress.score || 0}</td>
                    <td className="border px-4 py-2">{sectionProgress.time || 0}</td>
                </tr>
            );
        });
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <table className="min-w-full table-auto">
                <thead>
                <tr>
                    <th className="border px-4 py-2 text-left">Level</th>
                    <th className="border px-4 py-2 text-left">Section</th>
                    <th className="border px-4 py-2 text-left">Attempts</th>
                    <th className="border px-4 py-2 text-left">Score</th>
                    <th className="border px-4 py-2 text-left">Time</th>
                </tr>
                </thead>
                <tbody>{renderLevelData()}</tbody>
            </table>
        </div>
    );
};

export default StudentProgress;
