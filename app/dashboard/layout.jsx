import { AppSidebar } from '@/components/app-sidebar/app-sidebar'
import { NavUser } from '@/components/app-sidebar/nav-user'
import DashboardFooter from '@/components/DashboardFooter'
import GlobalLoader from '@/components/GlobalLoader'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import UserContextProvider from '@/contexts/UserContextProvider'
import { authOptions } from '@/lib/auth'
import InitServer from '@/mirage/InitServer'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboardLayout({ children }) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <>
      <div>
        <SidebarProvider>
          <div className='relative'>
            <AppSidebar />
          </div>
          <UserContextProvider>
            <SidebarInset className='theme-bg-light-rgba'>
              <header className='border-color-grey flex h-20 shrink-0 items-center justify-between gap-2 border-b bg-white shadow-[0_0_15px_-10px_black] transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
                <div className='flex items-center gap-2 px-4'>
                  <div>
                    <div className='SidebarTrigger'>
                      <SidebarTrigger className='-ml-1 text-white' />
                    </div>{' '}
                  </div>
                </div>
                <div>
                  <NavUser />
                </div>
              </header>
              <div className='bg-white p-4'>
                <Toaster />
                {/* <InitServer /> */}
                {children}
              </div>
              <GlobalLoader />
              {/* <DashboardFooter /> */}
            </SidebarInset>
          </UserContextProvider>
        </SidebarProvider>
      </div>
    </>
  )
}
