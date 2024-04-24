import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import SideBar from '@/components/side-bar';
import MainNav from '@/components/main-nav';

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

            <main className='w-full overflow-x-auto'>
              <MainNav />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
