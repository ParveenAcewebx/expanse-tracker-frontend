'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  useSidebar
} from '@/components/ui/sidebar'
import { CircleDollarSign, HomeIcon, LayoutList } from 'lucide-react'
import Link from 'next/link'
import NavMain from './nav-main'
// import { routesUrl } from "../utils/routesUrl";

const data = {
  home: {
    title: 'Home',
    url: '/dashboard',
    icon: HomeIcon,
    isActive: true
  },
  navMain: [
    {
      title: 'Expense Tracker',
      url: '/dashboard/expense-tracker',
      icon: CircleDollarSign,
      isActive: true,
      items: [
        {
          title: 'Add',
          url: '/dashboard/expense-tracker/add'
        },
        {
          title: 'List',
          url: '/dashboard/expense-tracker'
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
          url: '/dashboard/category'
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }) {
  const { state } = useSidebar()
  return (
    <>
      <Sidebar collapsible='icon' {...props}>
        <SidebarContent
          // className={$theme-bg}
          className={
            state === 'collapsed'
              ? 'sidebarMenuCollapsed main-menu-outer'
              : 'main-menu-outer'
          }
        >
          <div className='main-logo border-b[#0A0F15] bg[#0A0F15] flex h-20 items-center justify-center'>
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
          <NavMain homeItem={data.home} items={data.navMain} />
        </SidebarContent>
        <SidebarFooter></SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  )
}
