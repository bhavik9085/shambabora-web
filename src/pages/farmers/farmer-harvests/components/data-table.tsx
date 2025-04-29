import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '../components/data-table-pagination'
import { DataTableToolbar } from '../components/data-table-toolbar'
import AddEditRegion from './add-edit-farmer-harvests'
import { DataTableColumnHeader } from './data-table-column-header'
import { Checkbox } from '@radix-ui/react-checkbox'
import { DataTableRowActions } from './data-table-row-actions'
import DeleteDialog from './delete-farmer'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'
//@ts-ignore
interface DataTableProps<TData, TValue> {
  columns: any
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
   const navigate = useNavigate();
   // Modal states for Add/Edit
   const [showModal, setShowModal] = React.useState(false)
   const [showDeleteModal, setShowDeleteModal] = React.useState(false)
   const [mode, setMode] = React.useState<'add' | 'edit'>('add')
   const [initialData, setInitialData] = React.useState<{ id:number , name: string } | null>(
     null
   )

    // Handle Add/Edit actionavins
  const handleAdd = () => {
    setMode('add')
    setInitialData(null) 
    setShowModal(true)
  }

  const handleEdit = (rowData: { name: string, id:number }) => {
    setMode('edit')
    setInitialData(rowData) 
    navigate(`/dashboard/add-harvest/`, { state: { record: rowData } })
    setShowModal(true)
  }

  const handleCancel = () => {
    setShowModal(false) 
    setShowDeleteModal(false);
  }
 

  const handleDelete = (rowData: { name: string, id:number }) => {
    setInitialData(rowData) 
    setShowDeleteModal(true)
  }



  const getColumns = React.useCallback((): ColumnDef<TData>[] => [
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
    // {
    //   accessorKey: 'farmer',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title='Farmer ID' />,
    //   cell: ({ row }) => <span>{row.getValue('farmer')}</span>,
    //   enableSorting: true,
    //   enableHiding: false,
    // },
    {
      accessorKey: 'farmerName',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Farmer Name' />,
      cell: ({ row }) => <span>{row.getValue('farmerName')}</span>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'farmerPhoneNumber',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Phone Number' />,
      cell: ({ row }) => <span>{row.getValue('farmerPhoneNumber')}</span>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'grossWeight',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Gross weight' />,
      cell: ({ row }) => <span>{row.getValue('grossWeight')}</span>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'uom',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Unit of Measure' />,
      cell: ({ row }) => <span>{row.getValue('uom')}</span>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'packaging',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Packaging' />,
      cell: ({ row }) => <span>{row.getValue('packaging')}</span>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'tagNumber',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Tag Number' />,
      cell: ({ row }) => <span>{row.getValue('tagNumber')}</span>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'receiptNumber',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Receipt Number' />,
      cell: ({ row }) => <span>{row.getValue('receiptNumber')}</span>,
      enableSorting: true,
      enableHiding: false,
    },

    {
      accessorKey: 'amcosName',
      header: ({ column }) => <DataTableColumnHeader column={column} title='AMCOS Name' />,
      cell: ({ row }) => <span>{row.getValue('amcosName')}</span>,
      enableSorting: true,
      enableHiding: false,
    },

    {
      accessorKey: 'receivedByName',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Registrar Name' />,
      cell: ({ row }) => <span>{row.getValue('receivedByName')}</span>,
      enableSorting: true,
      enableHiding: false,
    },

    {
      accessorKey: 'cropName',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Crop Name' />,
      cell: ({ row }) => <span>{row.getValue('cropName')}</span>,
      enableSorting: true,
      enableHiding: false,
    },

    {
      accessorKey: 'cropGradeName',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Crop Grade Name' />,
      cell: ({ row }) => <span>{row.getValue('cropGradeName')}</span>,
      enableSorting: true,
      enableHiding: false,
    },

    {
      accessorKey: 'collectionCenterName',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Collection Center Name' />,
      cell: ({ row }) => <span>{row.getValue('collectionCenterName')}</span>,
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: 'receivedAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title='Received At' />,
      cell: ({ row }) => (
        <span>{format(new Date(row.getValue('receivedAt')), 'dd MMM yyyy')}</span>
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <DataTableRowActions row={row} onEdit={()=>  {
          navigate(`/dashboard/add-harvest/`)
        }} onDelete={handleDelete} onView={() => {
          navigate(`/dashboard/harvest-details/${row.getValue('id')}`)
        }} />
      ),
    },
  ], [handleEdit, handleDelete]);
  
  const table = useReactTable({
    data,
    columns:getColumns(),
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

 
  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} handleAdd={handleAdd}/>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  // onDoubleClick={() => handleEdit(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
   
      {showDeleteModal && (
        <DeleteDialog id={initialData?.id} name={initialData?.name} onClose={handleCancel}        
        />
      )}
    </div>
  )
}
