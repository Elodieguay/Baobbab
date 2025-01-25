import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '../ui/table';

const TableProfile = (): JSX.Element => {
    const courses = [
        {
            date: '08 Janvier 2025',
            course: 'Cours de danse',
            horaire: '18H',
            address: '10 Rue de Paris, Nantes',
            reminder: 'Apporter des chaussures',
            status: 'Confirmé',
        },
        {
            date: '10 Janvier 2025',
            course: 'Cours de yoga',
            horaire: '20H',
            address: '25 Rue des Lilas, Lyon',
            reminder: 'Prendre un tapis de yoga',
            status: 'En attente',
        },
    ];

    return (
        <Table className="w-full table-auto border-collapse ">
            <TableHeader>
                <TableRow>
                    <TableHead className="border px-4 py-2 text-left">
                        Date
                    </TableHead>
                    <TableHead className="border px-4 py-2 text-left">
                        Cours
                    </TableHead>
                    <TableHead className="border px-4 py-2 text-left">
                        Horaire
                    </TableHead>
                    <TableHead className="border px-4 py-2 text-left">
                        Adresse
                    </TableHead>
                    <TableHead className="border px-4 py-2 text-left">
                        Statut
                    </TableHead>
                    <TableHead className="border px-4 py-2 text-left">
                        Ne pas oublier
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses?.map((item) => (
                    <TableRow>
                        <TableCell className="border px-4 py-2">
                            {item.date}
                        </TableCell>
                        <TableCell className="border px-4 py-2">
                            {item.course}
                        </TableCell>
                        <TableCell className="border px-4 py-2">
                            {item.horaire}
                        </TableCell>
                        <TableCell className="border px-4 py-2">
                            {item.address}
                        </TableCell>
                        <TableCell className="border px-4 py-2">
                            {item.status}
                        </TableCell>
                        <TableCell className="border px-4 py-2">
                            {item.reminder}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TableProfile;
