'use client'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface NavMainProps {
  homeItem: {
    title: string
    url: string
    icon: LucideIcon
  }
  items: {
    title: string
    url: string
    icon?: LucideIcon
    items?: {
      title: string
      url: string
      items?: {
        title: string
        url: string
      }[]
    }[]
  }[]
}

export default function NavMain({ homeItem, items }: NavMainProps) {
  const pathname = usePathname()
  const [openSection, setOpenSection] = useState<string | null>(null)
  const { state } = useSidebar() // <-- now you have 'state'

  const isExactUrl = (url: string) => pathname === url
  const isUnderUrl = (url: string) => pathname.startsWith(url + '/')

  // const isActiveUrl = (url: string) => {
  //   if (url === '/dashboard') return pathname === url
  //   return pathname.startsWith(url)
  // }

  const isParentActive = (title: string, url: string) =>
    openSection === title || pathname.startsWith(url)

  useEffect(() => {
    const storedSection = localStorage.getItem('openSection')
    if (storedSection) setOpenSection(storedSection)
  }, [])

  const toggleSection = (title: string) => {
    setOpenSection(prev => {
      const newState = prev === title ? null : title
      localStorage.setItem('openSection', newState || '')
      return newState
    })
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {/* Home Link */}
        <SidebarMenuItem className='m-1 rounded'>
          <SidebarMenuButton
            asChild
            tooltip={homeItem.title}
            className={cn(
              'main-menu-item theme-text-color !rounded px-1 py-5 font-normal active:bg-sidebar-primary/5 active:text-sidebar-primary',
              isExactUrl(homeItem.url) && ''
            )}
          >
            <Link href={homeItem.url}>
              <span
                className={cn(
                  'menu-icon flex !h-7 !w-7 items-center justify-center rounded p-1 !text-gray-700',
                  isExactUrl(homeItem.url) && 'theme-text-color'
                )}
              >
                {homeItem.icon && <homeItem.icon />}
              </span>
              <span className='text-gray-700'>{homeItem.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Sidebar Sections */}
        {items.map(item => {
          const isOpen = openSection === item.title
          const isActive = item.url && isParentActive(item.title, item.url)
          console.log('isOpen', isOpen)
          console.log('isActive', isActive)

          return (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              className='group/collapsible'
            >
              <SidebarMenuItem className='m-1 rounded'>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={cn(
                      'theme-text-color main-menu-item !rounded px-1 py-5 font-normal',
                      isActive && 'font-normal'
                    )}
                    tooltip={item.title}
                    onClick={() => toggleSection(item.title)}
                  >
                    {/* Always render the icon first */}
                    <span
                      className={cn(
                        `flex-shrink-0 items-center justify-center rounded !text-gray-700 ${isActive && 'text-white'} ${isOpen ? 'bg-[#f0eded] text-white' : 'menu-icon flex !h-7 !w-7 p-1'}`
                      )}
                    >
                      {item.icon && <item.icon />}
                    </span>

                    {/* Only show text if not collapsed */}
                    <span
                      className={cn(
                        `truncate text-gray-700 ${isOpen && 'text-white'}`
                      )}
                    >
                      {item.title}
                    </span>

                    {/* Hide chevron in collapsed mode */}
                    {/* {openSection === item.title && state !== 'collapsed' && ( */}
                    <ChevronRight
                      className={cn(
                        `ml-auto transition-transform duration-200`,
                        isOpen && 'rotate-90 text-[#f0eded]'
                      )}
                    />
                    {/* )} */}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub className='sub-menu-item px-2 py-2'>
                    {item.items?.map(subItem => (
                      <SidebarMenuSubItem
                        key={subItem.title}
                        className='relative py-1'
                      >
                        {subItem.items ? (
                          <Collapsible asChild>
                            <>
                              <CollapsibleTrigger asChild>
                                <SidebarMenuSubButton className='theme-text-color cursor-pointer !rounded font-normal'>
                                  <div className='flex w-full items-center justify-between'>
                                    <span className='text-gray-700'>
                                      {subItem.title}
                                    </span>
                                    <ChevronRight className='ml-auto w-4 transition-transform duration-200' />
                                  </div>
                                </SidebarMenuSubButton>
                              </CollapsibleTrigger>
                              <CollapsibleContent className='pl-4'>
                                <SidebarMenuSub className='sub-menu-ul m-0 border-none'>
                                  {subItem.items.map(thirdItem => (
                                    <SidebarMenuSubItem
                                      key={thirdItem.title}
                                      className='relative py-1'
                                    >
                                      {/* third level items */}
                                      <SidebarMenuSubButton
                                        asChild
                                        className={cn(
                                          'theme-text-color cursor-pointer !rounded font-normal hover:text-sidebar-primary active:text-sidebar-primary',
                                          isExactUrl(thirdItem.url) &&
                                            'font-normal text-sidebar-primary'
                                        )}
                                      >
                                        <Link href={thirdItem.url}>
                                          <span>{thirdItem.title}</span>
                                        </Link>
                                      </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                  ))}
                                </SidebarMenuSub>
                              </CollapsibleContent>
                            </>
                          </Collapsible>
                        ) : (
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              'theme-text-color cursor-pointer !rounded font-normal hover:text-sidebar-primary active:text-sidebar-primary',
                              isExactUrl(subItem.url) &&
                                'font-medium text-red-700'
                            )}
                          >
                            <Link href={subItem.url}>
                              <span
                                className={cn(
                                  'transition-colors',
                                  isExactUrl(subItem.url)
                                    ? 'text-red-700'
                                    : 'text-gray-700 hover:text-red-700'
                                )}
                              >
                                {subItem.title}
                              </span>
                            </Link>
                          </SidebarMenuSubButton>
                        )}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
