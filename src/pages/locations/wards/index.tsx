import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useQuery } from '@tanstack/react-query'
import { getRWards } from '@/helpers/api-helper'

export default function Ward() {
  const { data: wards, isLoading } = useQuery({
    queryKey: ["wards"],
    queryFn: async () => {
      const response:any = await getRWards();
      console.log(response);
      return response;
    },
  });
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body>
        <div className='mb-2 flex items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Wards</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your Ward
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        {
          isLoading ? <div>Loading .....</div>:  <DataTable data={wards} columns={columns} />
         }
        </div>
      </Layout.Body>
    </Layout>
  )
}
