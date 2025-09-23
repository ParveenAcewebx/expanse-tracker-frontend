'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { CalendarDays, CircleDollarSign, Fence, IndianRupee, LayoutDashboard, LayoutList, ReceiptIndianRupee, SettingsIcon, SquareUser } from 'lucide-react'
import Link from 'next/link'
import NavMain from './nav-main'
import { NavUser } from './nav-user'

const data = {
home: {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,                                                                                                                                                                        
    isActive: true
  },
  navMain: [
    {
      title: 'Expense Tracker',
      url: '/dashboard/expense',
      icon: CircleDollarSign,
      isActive: true,
      items: [
        {
          title: 'Add',
          url: '/dashboard/expense/add'
        },
        {
          title: 'List',
          url: '/dashboard/expenses'
        }
      ]
    },
    {
      title: 'Category',
      url: '/dashboard/category',
      icon: LayoutList,
      isActive: true,
      items: [
        {
          title: 'Add',
          url: '/dashboard/category/add'
        },
        {
          title: 'List',
          url: '/dashboard/categories'
        }
      ]
    }
  ]
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarContent className='theme-bg'>
        <div className='main-logo border-b[#0A0F15] !bg-white flex h-20 items-center justify-center'>
            <Link href='/admin' className='flex-shrink-0'>
              {state === 'collapsed' ? (
                <img
                  src='/images/ace-logo.png'
                  alt='Logo small'
                  className='w-12'
                />
              ) : (
                <img
                  src='/images/acewebx-logo.png'
                  className='w-48'
                  alt='Logo full'
                />
              )}
            </Link>
            {/* <p className={cn(
              'font-semibold transition-all',
              state === 'collapsed'
                ? 'w-0 overflow-hidden opacity-0'
                : 'w-auto opacity-100'
            )}
          >
          </p> */}
          </div>
        <NavMain homeItem={data?.home} items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}