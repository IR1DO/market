import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import SideBar from '@/components/side-bar';
import MainNav from '@/components/main-nav';
import { Toaster } from '@/components/ui/toaster';

const roboto_mono = Roboto_Mono({ subsets: ['latin'] });

// SMS stands for Supermarket Management System
export const metadata: Metadata = {
  title: 'SMS',
  description: 'A web application for managing a supermarket',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto_mono.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='flex min-h-screen'>
            <SideBar />
            <aside className='fixed inset-y-0 left-0 z-[-100] hidden w-14 flex-col border-r bg-background sm:flex sm:static' />

            <div className='w-full overflow-x-auto flex flex-col'>
              <MainNav />
              {children}
            </div>
          </div>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
