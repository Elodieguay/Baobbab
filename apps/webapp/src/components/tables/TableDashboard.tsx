import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '../ui/table';
import React from 'react';
import log from 'loglevel';
import { CoursesDTOGeojson } from '@baobbab/dtos';

export interface CoursesProps {
    id: number;
    course: string;
    day: string;
    hour: string;
    address: string;
    reminder: string;
    description: string;
}

interface TableDashboardProps {
    courses?: CoursesDTOGeojson;
}

const TableDashboard: React.FC<TableDashboardProps> = ({ courses }) => {
    if (!courses) {
        return null;
    }
    // Fonction pour basculer l'état d'une ligne

    log.debug('datcourse', courses);
    return (
        <Table className="w-full table-auto border-collapse text-base  overflow-x-auto ">
            <TableHeader>
                <TableRow>
                    <TableHead className="border px-4 py-2 text-left text-[#01a274]">
                        Cours
                    </TableHead>
                    <TableHead className="border px-4 py-2 text-left text-[#01a274]">
                        Jours
                    </TableHead>
                    <TableHead className="border px-4 py-2 text-left text-[#01a274]">
                        Adresse
                    </TableHead>
                    <TableHead className="border px-4 py-2 text-left text-[#01a274]">
                        Ne pas oublier
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow className="bg-white hover:bg-gray-50">
                    <TableCell className="border px-4 py-5 flex coursess-center justify-between">
                        {/* <span>{courses.title}</span>
                                    <button
                                        onClick={() => toggleRow(courses.id)}
                                        className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {expandedRows[courses.id] ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </button> */}
                    </TableCell>
                    {/* <TableCell className="border px-4 py-2">
                                    {courses.schedule.day}
                                </TableCell>
                                <TableCell className="border px-4 py-2">
                                    {courses.address}
                                </TableCell>
                                <TableCell className="border px-4 py-2">
                                    {courses.reminder}
                                </TableCell> */}
                </TableRow>
                {/* 
                            {expandedRows[courses.id] && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="border px-4 py-3 bg-gray-50"
                                    >
                                        {courses.description ||
                                            'Aucune description disponible.'}
                                    </TableCell>
                                </TableRow>
                            )} */}
            </TableBody>
        </Table>
    );
};

export default TableDashboard;
