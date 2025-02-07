import { useState } from 'react';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '../ui/table';
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    courses: CoursesProps[];
}

const TableDashboard: React.FC<TableDashboardProps> = ({ courses }) => {
    const [expandedRows, setExpandedRows] = useState<{
        [key: number]: boolean;
    }>({});

    // Fonction pour basculer l'état d'une ligne
    const toggleRow = (id: number): void => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <Table className="w-full table-auto border-collapse text-base ">
            <TableHeader>
                <TableRow>
                    <TableHead className="border px-4 py-2 text-left text-[#01a274]">
                        Cours
                    </TableHead>
                    <TableHead className="border px-4 py-2 text-left text-[#01a274]">
                        Jours
                    </TableHead>
                    <TableHead className="border px-4 py-2 text-left text-[#01a274]">
                        Horaire
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
                {Array.isArray(courses) &&
                    courses?.map((item) => (
                        <React.Fragment key={item.id}>
                            <TableRow className="bg-white hover:bg-gray-50">
                                <TableCell className="border px-4 py-5 flex items-center justify-between">
                                    <span>{item.course}</span>
                                    <button
                                        onClick={() => toggleRow(item.id)}
                                        className="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {expandedRows[item.id] ? (
                                            <ChevronUp size={20} />
                                        ) : (
                                            <ChevronDown size={20} />
                                        )}
                                    </button>
                                </TableCell>
                                <TableCell className="border px-4 py-2">
                                    {item.day}
                                </TableCell>
                                <TableCell className="border px-4 py-2">
                                    {item.hour}
                                </TableCell>
                                <TableCell className="border px-4 py-2">
                                    {item.address}
                                </TableCell>
                                <TableCell className="border px-4 py-2">
                                    {item.reminder}
                                </TableCell>
                            </TableRow>

                            {expandedRows[item.id] && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="border px-4 py-3 bg-gray-50"
                                    >
                                        {item.description ||
                                            'Aucune description disponible.'}
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
            </TableBody>
        </Table>
    );
};

export default TableDashboard;
