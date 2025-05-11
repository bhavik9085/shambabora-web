import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'
import { DataTable } from './components/data-table'
import { columns } from './components/columns'
import { useQuery } from '@tanstack/react-query'
import { getRDistrict } from '@/helpers/api-helper'

export default function District() {
  const { data: districts, isLoading: isLoadingDistricts } = useQuery({
    queryKey: ["district"],
    queryFn: async () => {
      const response:any = await getRDistrict();
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
            <h2 className='text-2xl font-bold tracking-tight'>Districts</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your districts
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
         {
          isLoadingDistricts ? (
            <div>Loading .....</div>
          ) : (
            districts?.data?.length > 0 ? (
              <DataTable
                data={districts.data}
                columns={columns}
              />
            ) : (
              <div>No results found.</div>
            )
          )
         }
        </div>
      </Layout.Body>
    </Layout>
  )
}
