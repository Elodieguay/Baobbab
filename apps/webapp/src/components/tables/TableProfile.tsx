import { Table } from 'lucide-react';
import {
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableFooter,
} from '../ui/table';

const TableProfile = (): JSX.Element => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">date</TableHead>
                    <TableHead>Le cours</TableHead>
                    <TableHead>l'adresse</TableHead>
                    <TableHead>ne pas oublier</TableHead>
                    <TableHead>le status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody></TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Nombre de cours</TableCell>
                    <TableCell className="text-right">0</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
};

export default TableProfile;
