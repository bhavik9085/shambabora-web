// columns.tsx
import { ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { DataSchema } from '../data/schema'
import { format } from 'date-fns';

interface DataTableColumnsProps {
  handleEdit: (rowData: any) => void
  handleDelete: (rowData: any) => void
  handleView: (rowData: any) => void

}

export const columns = <TData extends DataSchema>({
  handleEdit,
  handleDelete,
  handleView
}: DataTableColumnsProps): ColumnDef<TData>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
            ? 'indeterminate'
            : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='SNO' />
    ),
    cell: ({ row, }) => <div className='w-[80px]'>{row.index + 1}</div>,
    enableSorting: false,
    enableHiding: false,
  },
   {
        accessorKey: 'name',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Name' />,
        cell: ({ row }) => (
          <span>
            {[
              row.getValue('firstName'),
              row.getValue('middleName'),
              row.getValue('lastName')
            ].filter(Boolean).join(' ')}
          </span>
        ),
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: 'phoneNumber',
        header: ({ column }) => <DataTableColumnHeader column={column} title='Phone Number' />,
        cell: ({ row }) => <span>{row.getValue('phoneNumber')}</span>,
        enableSorting: true,
        enableHiding: false,
      },
  {
    accessorKey: 'sex',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Sex' />,
    cell: ({ row }) => <span>{row.getValue('sex')}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'idType',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID Type' />,
    cell: ({ row }) => <span>{row.getValue('idType')}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'idNumber',
    header: ({ column }) => <DataTableColumnHeader column={column} title='ID Number' />,
    cell: ({ row }) => <span>{row.getValue('idNumber')}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'dob',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Date of Birth' />,
    cell: ({ row }) => (
      <span>{format(new Date(row.getValue('dob')), 'dd MMM yyyy')}</span>
    ),
    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: 'amcosMemberID',
    header: ({ column }) => <DataTableColumnHeader column={column} title='AMCOS Member ID' />,
    cell: ({ row }) => <span>{row.getValue('amcosMemberID')}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'mainCrop',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Main Crop' />,
    cell: ({ row }) => <span>{row.getValue('mainCrop')}</span>,
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'secondaryCrop',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Secondary Crop' />,
    cell: ({ row }) => <span>{row.getValue('secondaryCrop')}</span>,
    enableSorting: true,
    enableHiding: false,
  },
 
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} onEdit={handleEdit} onDelete={handleDelete} onView={handleView} />,
  },
]
