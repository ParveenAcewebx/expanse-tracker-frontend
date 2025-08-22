import GlobalLoader from '@/components/GlobalLoader'
import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/contexts/auth-provider'
import { LoaderProvider } from '@/contexts/loader-provider'
import QueryProvider from '@/contexts/query-provider'
import { ThemeProvider } from '@/contexts/theme-provider'
import { authOptions } from '@/lib/auth'
import { inter } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { getServerSession } from 'next-auth'
import './globals.css'
import InitServer from '@/mirage/InitServer'

export const metadata = {
  title: {
    template: '%s | CRM',
    default: 'Admin | CRM'
  },
  icons: {
    icon: ' /images/favicon.ico',
    shortcut: '/images/favicon.ico'
  }
}

export default async function AdminRootLayout({ children }) {
  const session = await getServerSession(authOptions)

  return (
    <html suppressHydrationWarning lang='en'>
      <head>
        <link rel='icon' href='/images/favicon.ico' />
      </head>

      <body
        suppressHydrationWarning
        className={cn(inter.className, 'antialiased')}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {/* <GlobalLoader/> */}
          <QueryProvider>
            <AuthProvider session={session}>
              <Toaster />
              {/* <Navbar /> */}
              {/* <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'> */}
              {/* <div className='container m-auto'> */}
              {/* <div className='flex items-center gap-2 pt-12'> */}
              {/* <Separator orientation='vertical' className='mr-2 h-4' /> */}

              {/* </div> */}
              {/* </div> */}
              {/* </header> */}
              <main className='min-h-screen'>
                <Toaster />
                <LoaderProvider>
                <InitServer />
                  <GlobalLoader />
                  {children}
                </LoaderProvider>
                {/* <LayoutHeader pageTitle='qwertyu'/> */}
              </main>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
