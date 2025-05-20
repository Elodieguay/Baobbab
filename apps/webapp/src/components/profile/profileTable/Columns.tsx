import { BookingResponse } from '@baobbab/dtos';
import { ColumnDef } from '@tanstack/react-table'; // Adjust the import path if necessary
import { CellRowCourses } from './CellRowCourses';
import i18next from 'i18next';
import log from 'loglevel';

export const columns: ColumnDef<BookingResponse>[] = [
    {
        accessorKey: 'organisationName',
        header: i18next.t('common:Profile.page.table.columns.organisation'),
    },
    {
        accessorKey: 'schedule.day',
        header: i18next.t('common:Profile.page.table.columns.day'),
    },
    {
        accessorKey: 'schedule.hours',
        header: i18next.t('common:Profile.page.table.columns.hour'),
    },
    {
        accessorKey: 'courses.title',
        header: i18next.t('common:Profile.page.table.columns.title'),
    },
    {
        accessorKey: 'courses.duration',
        header: i18next.t('common:Profile.page.table.columns.duration'),
    },
    {
        accessorKey: 'courses.address',
        header: i18next.t('common:Profile.page.table.columns.address'),
    },
    {
        accessorKey: 'courses.city',
        header: i18next.t('common:Profile.page.table.columns.city'),
    },
    {
        id: 'actions',
        cell: (cellData) => {
            if (cellData.row.depth === 0) {
                const user = cellData.row.original;
                log.debug('user', user);

                return <CellRowCourses cellData={user} />;
            }
            return null;
        },
    },
];
